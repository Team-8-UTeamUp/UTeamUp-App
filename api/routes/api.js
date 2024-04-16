import express from "express"
import {db} from "../db.js"

const router = express.Router()
import {PythonShell} from "python-shell";

const quiz = {
    studentId: '',
    projectpreference: ['1','2','3'],
    rank: ['1','2','3'],
    groupsize: ['1', '2', '3', '4', '5', '6'],
    skills: ['Front-End', 'Back-End', 'Full-Stack', 'Database', 'Machine Learning', 'Artificial Intelligence', 'Virtual Reality', 'Mobile Dev', 'Other'],
    languages: ['Java', 'C++', 'Python', 'HTML', 'CSS', 'SQL', 'JavaScript', 'NodeJs', 'Other'],
    exp: ['beg', 'int', 'adv'],
    bio: '',
};

router.get('/quiz', (req, res) => {
    res.send(quiz);
});

router.get("/", (req, res) => {
    res.json("Testing");
})


// QUIZ
// Question 1 - Skills
router.post('/quiz/q1', (req, res) => {
    //TODO: Check if studentId exists in DB before adding new
    const q = "INSERT INTO SKILLS(`studentId`, `skill`) VALUES (?)"
    const values = [
        req.body.studentId,
        req.body.skills
    ]
    db.query(q,[values], (err,data) => {
        if (err) return res.json(err);
        return res.status(200).json("Question 1 updated for " + studentId)
    })
})

// Question 2 - Languages
router.post('/quiz/q2', (req, res) => {
    const q = "INSERT INTO LANGUAGES(`studentId`, `languages`) VALUES (?)"
    const values = [
        req.body.studentId,
        req.body.languages
    ]
    db.query(q,[values], (err,data) => {
        if (err) return res.json(err);
        return res.status(200).json("Question 2 updated for " + studentId)
    })
})

// TODO: Quesiton 3 - Top 5 CS Projects
// TODO: Quesiton 4 - Top 5 UTDesign Projects
// TODO: Quesiton 5 - Prefered Team Size

// Quesiton 6 - Bio
router.post('/quiz/q6', (req, res) => {
    const q = "INSERT INTO STUDENT(`studentId`, `prefGroupSize`, `bio`) VALUES (?)"
    const values = [
        req.body.studentId,
        req.body.prefGroupSize,
        req.body.bio
    ]
    db.query(q,[values], (err,data) => {
        if (err) return res.json(err);
        return res.status(200).json("Question 2 updated for " + studentId)
    })
})

//STUDENTS PAGE
//get student info
router.get('/student/info', (req, res) => {
    const studentId = 'ABG222946'
    //const studentId = "AAE297154"
    const groupCheck = `SELECT groupId from student where studentId =?`
    db.query(groupCheck, [studentId], (err, data) => {
        if (err) return res.status(500).send(err);
        let params = {
                'studentId': studentId,
        }
        let s;
        let args = []
        const groupId = data[0]['groupId']
        let firstSql = "projData"
        let secondSql='skillData'
        if (groupId == 0){
            params['algType'] = 's2s'
                s = "select k.studentId, k.skill from skills k, individualstudents s where s.studentId=k.studentId;"
        }
        else{
            params['algType'] = 'g2s'
            params['groupId'] = groupId
            s = `SELECT p.groupId, projectNum, projRank FROM uteamup.grouppreference as p where p.groupId=?;`
            args = [groupId]
            firstSql = 'studentData'
            secondSql = "groupData"
        }
        const p = "SELECT p.studentId, projectNum, projRank FROM projectpreference as p, individualstudents as s where  s.studentId=p.studentId;"
        db.query(p, [], (err, data) => {

            if (err) return res.status(500).send(err);
            params[firstSql] = data;


            db.query(s, args, (err, data) => {
                if (err) return res.status(500).send(err);
                //const s =  "select k.studentId, k.skill from skills k, individualstudents s where s.studentId=k.studentId;"
                params[secondSql] = data
                const stringifieidData = JSON.stringify(params)
                //return res.status(200).json(params)

                const options = {
                    pythonPath: '../Database/.venv/Scripts/python.exe',
                    pythonOptions: ['-u'],
                    scriptPath: '../Database/',
                }

                const pyShell = new PythonShell('sortAlg.py', options);
                pyShell.send(stringifieidData);
                // Handle received data from the Python script
                pyShell.on('message', (message) => {
                    let resultData = JSON.parse(message);

                    let match = resultData['matches'];

                    const profileQuery = `select * from studentProfile where studentId in ?`
                    db.query(profileQuery, [[match]], (err, data) => {
                        if (err) return res.status(500).send(err);
                        let studentData = data;
                        let studentIndex = 0;
                        let orderedList = [];
                        match.forEach(studentId => {
                            // Filter the data based on the current studentId
                            let searchResultsProfile = studentData.filter(entry => entry.studentId === studentId);

                            if (searchResultsProfile.length > 0) {
                                let temp = {
                                    name: searchResultsProfile[0]['name'],
                                    id: searchResultsProfile[0]['studentId'],
                                    photo: '../assets/profilePhoto.png',
                                    index: studentIndex,
                                    bio: searchResultsProfile[0]['bio'],
                                    groupSizePreference: searchResultsProfile[0]['prefGroupSize'],
                                    skills: searchResultsProfile[0]['skills'].replace(/"/g, '').split(','),
                                    codingLanguages: searchResultsProfile[0]['languages'].replace(/"/g, '').split(','),
                                    preferences: [searchResultsProfile[0]['UTDProjects'].replace(/"/g, '').split(','), searchResultsProfile[0]['CSProjects'].replace(/"/g, '').split(',')]
                                }

                                studentIndex = studentIndex + 1;

                                // Add the filtered results to the query object
                                orderedList.push(temp);
                            }
                        });

                        return res.status(200).json(orderedList)


                    });



                });

                // Handle errors
                pyShell.on('error', (error) => {
                    return res.status(500).send(error);
                });

            });

        });
    });
})

//login page

router.post('/login', (req, res) => {
    const q = "SELECT * FROM admin WHERE adminId = ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        return res.status(200).json("Logged in!");
    });
});

router.get('/group_info', (req, res) => {
    let studentId = 'AAE297154'
    const p = "SELECT p.studentId, projectNum, projRank FROM projectpreference as p where  p.studentId=?;"
    db.query(p, [studentId], (err, data) => {
        let params = {
            //'studentId':req.body.studentId,   //once connected use this version
            'studentId': studentId,
            'algType': 's2g'
        }
        if (err) return res.status(500).send(err);
        params["studentData"] = data;

        const s = "SELECT p.groupId, projectNum, projRank FROM uteamup.grouppreference as p, formedgroups as f where f.groupId=p.groupId and groupCompleted=0;"

        db.query(s, [], (err, data) => {
            if (err) return res.status(500).send(err);
            //const s =  "select k.studentId, k.skill from skills k, individualstudents s where s.studentId=k.studentId;"
            params['groupData'] = data
            const stringifieidData = JSON.stringify(params)
            const options = {
                pythonPath: '../Database/.venv/Scripts/python.exe',
                pythonOptions: ['-u'],
                scriptPath: '../Database/',
            };
            ///*
            const pyShell = new PythonShell('sortAlg.py', options);
            pyShell.send(stringifieidData);
            // Handle received data from the Python script
            pyShell.on('message', (message) => {
                let resultData = JSON.parse(message);

                let match = resultData['matches'];
                //return res.status(200).json(match)
                const groupProf = `select * from groupProfile where groupId in ?;`
                db.query(groupProf, [[match]], (err, data) => {
                        if (err) return res.status(500).send(err);
                        let groupData = data;
                        let groupIndex = 0;
                        let orderedList = [];
                        match.forEach(groupId => {
                            // Filter the data based on the current studentId
                            let searchResultsProfile = groupData.filter(entry => entry.groupId === groupId);

                            if (searchResultsProfile.length > 0) {
                                let temp = {
                                    groupName: searchResultsProfile[0]['groupName'],
                                    studentNames:searchResultsProfile[0]['members'].replace(/"/g, '').split(','),
                                    id: searchResultsProfile[0]['groupId'],
                                    index: groupIndex,
                                    skills: searchResultsProfile[0]['skills'].replace(/"/g, '').split(','),
                                    codingLanguages: searchResultsProfile[0]['languages'].replace(/"/g, '').split(','),
                                    preferences: [searchResultsProfile[0]['UTDProjects'].replace(/"/g, '').split(','), searchResultsProfile[0]['CSProjects'].replace(/"/g, '').split(',')],
                                    currentGroupSize: searchResultsProfile[0]['totalMembers'],
                                    preferedGroupSize: searchResultsProfile[0]['groupSizePref'],
                                    bio: JSON.parse(`[${searchResultsProfile[0]['bios'].replace(/\s+/g, '')}]`)

                                }

                                groupIndex = groupIndex + 1;

                                // Add the filtered results to the query object
                                orderedList.push(temp);
                            }
                        });

                        return res.status(200).json(orderedList)


                    });
            });

            // Handle errors
            pyShell.on('error', (error) => {
                return res.status(500).json(error);
            });
        });
    });
})


router.get('/requests/student_info', (req, res) => {
    let studentId = 'AAE297154'
    const requests = `select * from studentProfile where studentId in (select receiverId from studentrequeststudent where senderId =?);`
    db.query(requests, [studentId], (err, data) => {
        if (err) return res.status(500).send(err);
        let formattedData = [];
        let studentIndex = 0
        data.forEach(item => {
            formattedData.push({
                name: item.name,
                id: item.studentId,
                photo: '../assets/profilePhoto.png',
                index: studentIndex,
                bio: item.bio,
                groupSizePreference: item.prefGroupSize,
                skills: item.skills.replace(/"/g, '').split(','),
                codingLanguages: item.languages.replace(/"/g, '').split(','),
                preferences: [item.UTDProjects.replace(/"/g, '').split(','), item.CSProjects.replace(/"/g, '').split(',')]
            });
            studentIndex = studentIndex + 1
        });

        // Send the formatted data as response
        res.status(200).json(formattedData);
    });
})

router.get('/requests/group_info', (req, res) => {
    let studentId = 'AAE297154'
    const requests = `select * from groupProfile where groupId in (select receiverId from studentrequestgroup where senderId = ?);`
    db.query(requests, [studentId], (err, data) => {
        if (err) return res.status(500).send(err);
        let formattedData = [];
        let groupIndex = 0
        data.forEach(item => {
            formattedData.push({
                groupName: item.groupName,
                studentNames:item.members.replace(/"/g, '').split(','),
                id: item.groupId,
                index: groupIndex,
                skills: item.skills.replace(/"/g, '').split(','),
                codingLanguages: item.languages.replace(/"/g, '').split(','),
                preferences: [item.UTDProjects.replace(/"/g, '').split(','), item.CSProjects.replace(/"/g, '').split(',')],
                currentGroupSize: item.totalMembers,
                preferedGroupSize: item.groupSizePref,
                bio: JSON.parse(`[${item.bios.replace(/\s+/g, '')}]`)
            });
            groupIndex = groupIndex + 1
        });

        // Send the formatted data as response
        res.status(200).json(formattedData);
    });
})

router.get('/invites/student_info', (req, res) => {
    let studentId = 'AAE297154'
    const invites =`select * from studentProfile where studentId in (select senderId from studentrequeststudent where receiverId =?);`
    db.query(invites, [studentId], (err, data) => {
        if (err) return res.status(500).send(err);
        let formattedData = [];
        let studentIndex = 0
        data.forEach(item => {
            formattedData.push({
                name: item.name,
                id: item.studentId,
                photo: '../assets/profilePhoto.png',
                index: studentIndex,
                bio: item.bio,
                groupSizePreference: item.prefGroupSize,
                skills: item.skills.replace(/"/g, '').split(','),
                codingLanguages: item.languages.replace(/"/g, '').split(','),
                preferences: [item.UTDProjects.replace(/"/g, '').split(','), item.CSProjects.replace(/"/g, '').split(',')]
            });
            studentIndex = studentIndex + 1
        });

        // Send the formatted data as response
        res.status(200).json(formattedData);
    });
})

router.get('/invites/group_info', (req, res) => {
    let studentId = 'AAE297154'
    const invites = `select * from groupProfile where groupId in (select senderId from grouprequeststudent where receiverid = ?);`
    db.query(invites, [studentId], (err, data) => {
        if (err) return res.status(500).send(err);
        let formattedData = [];
        let groupIndex = 0
        data.forEach(item => {
            formattedData.push({
                groupName: item.groupName,
                studentNames:item.members.replace(/"/g, '').split(','),
                id: item.groupId,
                index: groupIndex,
                skills: item.skills.replace(/"/g, '').split(','),
                codingLanguages: item.languages.replace(/"/g, '').split(','),
                preferences: [item.UTDProjects.replace(/"/g, '').split(','), item.CSProjects.replace(/"/g, '').split(',')],
                currentGroupSize: item.totalMembers,
                preferedGroupSize: item.groupSizePref,
                bio: JSON.parse(`[${item.bios.replace(/\s+/g, '')}]`)
            });
            groupIndex = groupIndex + 1
        });

        // Send the formatted data as response
        res.status(200).json(formattedData);
    });
})
export default router;
