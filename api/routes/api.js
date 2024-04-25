
import express from "express"
import {db} from "../db.js"
//import bcrypt from "bcryptjs";

const router = express.Router()
import {PythonShell} from "python-shell";

// const studentId = 'ABG222946'
//const studentId = "AAE297154"
const studentId = 'AHR277028'
//const studentId = "JBL269228"
var pyPath = process.platform;
if (pyPath == "darwin") {
    pyPath = '../Database/.venv/bin/python';
} else if (pyPath == "win32" || pyPath == "win64") {
    pyPath = '../Database/.venv/Scripts/python.exe';
} else {
    pyPath = '../Database/.venv/bin/python';
}

router.get("/", (req, res) => {
    res.json("Testing");
})


// QUIZ
// Question 1 - Skills
router.post('/quiz/q1', (req, res) => {
    //TODO: Check if studentId exists in DB before adding new
    const values = [
        req.body.studentId,
        req.body.skills
    ]
    let skillPairs = [];

    for (let i = 0; i < values[1].length; i++) {
        skillPairs += `('${values[0]}', '${values[1][i]}'), `;
    }

    // Remove the trailing comma and space
    skillPairs = skillPairs.slice(0, -2);
    // delete existing values and insert new values
    const d = `delete from skills where studentId = '${values[0]}'`
    db.query(d,[], (err,data) => {
        if (err) return res.json(err);
        const q = `INSERT INTO SKILLS(studentId, skill)
                   VALUES ${skillPairs}`
        db.query(q, [], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("Question 1 updated for " + studentId)
        })
    })
})

// Question 2 - Languages
router.post('/quiz/q2', (req, res) => {
    const values = [
        req.body.studentId,
        req.body.languages
    ]
    let langPairs = [];

    for (let i = 0; i < values[1].length; i++) {
        langPairs += `('${values[0]}', '${values[1][i]}'), `;
    }

    // Remove the trailing comma and space
    langPairs = langPairs.slice(0, -2);
    const d = `delete from languages where studentId = '${values[0]}'`
    db.query(d,[], (err,data) => {
        if (err) return res.json(err);
        const q = `INSERT INTO languages(studentId, languages)
                   VALUES ${langPairs}`
        db.query(q, [], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("Question 1 updated for " + studentId)
        })
    })
})

// Question 3 - Top 5 CS Projects
router.post('/quiz/q3-4', (req, res) => {
    const {studentId, rankings, projType} = req.body
    if(rankings.length !== 5) {
        return res.status(400).json("Please provide exactly 5 CS Projects");
    }

    const d = `delete from projectpreference p where studentId = '${studentId}'  and p.projectNum in (select projectNum from ${projType})`
    let finalRank = []
    rankings.map((rank, index) =>  finalRank += `('${studentId}',${rank},${index + 1}),`);

    // Remove the trailing comma and space
    finalRank = finalRank.slice(0, -1);
    db.query(d,[], (err,data) => {
        if (err) return res.json(err);
        const q = `INSERT INTO PROJECTPREFERENCE(studentId, projectNum, projRank) VALUES ${finalRank}`;

        db.query(q, [], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("Question 3 updated for " + studentId)
        })
    })

});


// Question 5 - Preferred Team Size
router.post('/quiz/q5', (req, res) => {
    if(req.body.teamSize < 3 || req.body.teamSize > 6) {
        return res.status(400).json("Please provide a team size between 3 and 6");
    }
    const q = "UPDATE STUDENT SET `prefGroupSize` = ? WHERE `studentId` = ?";
    const values = [req.body.teamSize, req.body.studentId];
    db.query(q, values, (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json("Question 5 updated for " + req.body.studentId);
    });
});

// Quesiton 6 - Bio
router.post('/quiz/q6', (req, res) => {
    const q = "update student set bio=? where studentId =?"
    const values = [
        req.body.studentId,
        req.body.bio
    ]
    db.query(q,[values[1],values[0]], (err,data) => {
        if (err) return res.json(err);
        return res.status(200).json("Question 6 updated for " + studentId)
    })
})


// Get projects lists
router.get('/utdprojects', (req, res) => {
    const q = `SELECT * from utdprojects order by projectNum asc`
    db.query(q, [], (err, data) => {
        if (err) return res.status(500).send(err);
        let formattedData = [];
        data.forEach(item => {
            formattedData.push({
                projectNum: item.projectNum,
                projName: item.title,
            });
        });
        return res.status(200).json(formattedData)

    });
})


// View cs projects
router.get('/csprojects', (req, res) => {
    const q = `SELECT * from csprojects order by projectNum asc`
    db.query(q, [], (err, data) => {
        if (err) return res.status(500).send(err);
        let formattedData = [];
        data.forEach(item => {
            formattedData.push({
                projectNum: item.projectNum,
                projName: item.title,
            });
        });
        return res.status(200).json(formattedData)

    });
})

// Check if quiz is populated

// Profile page
router.get('/student_profile', (req, res) => {
    const q = `select * from studentProfile where studentId =?;`
    db.query(q, [studentId], (err, data) => {
        if (err) return res.status(500).send(err);
        let temp = {
            name: data[0]['name'],
            id: data[0]['studentId'],
            bio: data[0]['bio'],
            groupSizePreference: data[0]['prefGroupSize'],
            skills: data[0]['skills'].replace(/"/g, '').split(','),
            codingLanguages: data[0]['languages'].replace(/"/g, '').split(','),
            preferences: [data[0]['UTDProjects'].replace(/"/g, '').split(','), data[0]['CSProjects'].replace(/"/g, '').split(',')]
        }
        return res.status(200).json(temp)
    });
})




// My Group profile
router.get('/group_profile', (req, res) => {
    const q =`select * from groupProfile where groupId in (select groupId from student where studentId= ?)`
    db.query(q, [studentId], (err, data) => {
        if (err) return res.status(500).send(err);

         // Check if data is empty
         if (data.length === 0) {
            return res.status(200).json(null); // Return null if data is empty
        }

        let temp = {
            groupName: data[0]['groupName'],
            studentNames:data[0]['members'].replace(/"/g, '').split(','),
            id: data[0]['groupId'],
            emails:data[0]['emails'].replace(/"/g, '').split(','),
            skills: data[0]['skills'].replace(/"/g, '').split(','),
            codingLanguages: data[0]['languages'].replace(/"/g, '').split(','),
            preferences: [data[0]['UTDProjects'].replace(/"/g, '').split(','), data[0]['CSProjects'].replace(/"/g, '').split(',')], //[data[0]['UTDNums'], data[0]['CSNums']].map(pref => pref.split(',').map(Number)),
            currentGroupSize: data[0]['totalMembers'],
            preferedGroupSize: data[0]['groupSizePref'],
            bio: data[0]['bios'].replace(/"/g, '').split(',')

                                }
        return res.status(200).json(temp)
    });
})

// wip changes name and size, needs proj ranks
router.post('/edit_group', (req, res) => {
    const{groupId, newName, newSize, newUTD, newCS } = req.body

    let q = `update formedGroups set groupName='${newName}' where groupId = ${groupId}`
    if (newSize >=4 && newSize <=6){
        q = `update formedGroups set groupName='${newName}',  groupSizePref =${newSize} where groupId = ${groupId}`
    }

    db.query(q, [studentId], (err, data) => {
        if (err) return res.status(500).send(err);
    });




    // check that the list has unique project numbers
    let UTD = newUTD.map(str => parseInt(str))
    let isUniqueUTD = (new Set(UTD)).size === newUTD.length;
    if (isUniqueUTD){
        let finalRank = []
        UTD.map((rank, index) =>  finalRank += `(${groupId},${rank},${index + 1}),`);

        // Remove the trailing comma and space
        finalRank = finalRank.slice(0, -1);
        let UTDP =[]
        const v = `select projectNum from utdprojects`
        db.query(v,[],(err,data)=>{
            if (err) return res.json(err);
            UTDP = data.map(project => project.projectNum);
            let isValidUTD = UTD.every(rank => UTDP.includes(rank));
            if (isValidUTD) {
                const d = `delete from grouppreference p where groupId = ${groupId}  and p.projectNum in (select projectNum from utdprojects)`
                db.query(d, [], (err, data) => {
                    if (err) return res.json(err);
                    const q = `INSERT INTO grouppreference(groupId, projectNum, projRank)
                               VALUES ${finalRank}`;
                    db.query(q, [], (err, data) => {
                        if (err) return res.json(err);

                    })
                })
            }
        })


    }

    let CS = newCS.map(str => parseInt(str))
    let isUniqueCS = (new Set(CS)).size === newCS.length;
    if (isUniqueCS){
        const d = `delete from grouppreference p where groupId = ${groupId}  and p.projectNum in (select projectNum from csprojects)`
        let finalRank = []

        CS.map((rank, index) =>  finalRank += `(${groupId},${rank},${index + 1}),`);

        // Remove the trailing comma and space
        finalRank = finalRank.slice(0, -1);
        let CSP = []
        const v = `select projectNum from csprojects`

         db.query(v,[],(err,data)=>{
            if (err) return res.json(err);
            CSP = data.map(project => project.projectNum);
            let isValidUTD = CS.every(rank => CSP.includes(rank));
            if (isValidUTD) {
                const d = `delete from grouppreference p where groupId = ${groupId}  and p.projectNum in (select projectNum from csprojects)`
                db.query(d, [], (err, data) => {
                    if (err) return res.json(err);
                    const q = `INSERT INTO grouppreference(groupId, projectNum, projRank)
                               VALUES ${finalRank}`;
                    db.query(q, [], (err, data) => {
                        if (err) return res.json(err);

                    })
                })
            }
        })
    }


    return res.status(200).send(`profile updated for group ${groupId}`)


})

router.post('/close_group', (req, res) => {
    const {groupId} = req.body
    let q = `update formedGroups
             set groupCompleted=True
             where groupId = ${groupId}`
    // set group to closed
    db.query(q, [], (err, data) => {
        if (err) return res.status(500).send(err);
    });
    // delete all requests to and from group
    const sg = `delete from studentrequestgroup where receiverId=${groupId}`
    const gs = `delete from grouprequeststudent where senderId=${groupId}`

    db.query(sg, [], (err, data) => {
        if (err) return res.status(500).send(err);
    });
    db.query(gs, [], (err, data) => {
        if (err) return res.status(500).send(err);
    });
    return res.status(200).send(`Group ${groupId} closed`)
})

//STUDENTS PAGE
//get student info
router.get('/student_info', (req, res) => {
    const groupCheck = `SELECT groupId from student where studentId =?`
    db.query(groupCheck, [studentId], (err, data) => {
        if (err) return res.status(501).send(err);
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

            if (err) return res.status(502).send(err);
            params[firstSql] = data;


            db.query(s, args, (err, data) => {
                if (err) return res.status(503).send(err);
                //const s =  "select k.studentId, k.skill from skills k, individualstudents s where s.studentId=k.studentId;"
                params[secondSql] = data
                const stringifieidData = JSON.stringify(params)
                //return res.status(200).json(params)

                const options = {
                    pythonPath: pyPath,
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
                        if (err) return res.status(504).send(err);
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
//for admin
router.post('/admin/login', (req, res) => {
    const q = "SELECT * FROM admin WHERE adminId = ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        return res.status(200).json("Logged in!");
    });
});
/*
//Student registration
router.post('/register', async (req, res) => {
    //const { firstName, lastName, userId, password } = req.body;
    console.log("Request body:", req.body); // Log the request bod

    try {
        const userIdFormat = /^[A-Za-z]{3}\d{6}$/;
        if (!userIdFormat.test(req.body.username)) {
            return res.status(400).json({ msg: 'Invalid userId format. It should be 3 alphabetical letters followed by 6 integers.' });
        }

        const existingUser = await db.query('SELECT * FROM user WHERE userId = ?', [req.body.username]);
        console.log('SQL Query:', existingUser, ', Parameters:', [req.body.username]);
        if (existingUser.length > 0) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        await db.query('INSERT INTO user(`userId`, `firstName`, `lastName`, `password`) VALUES (?, ?, ?, ?)', [req.body.username, req.body.firstName, req.body.lastName, req.body.password]);
        await db.query('INSERT INTO student(`studentId`, `email`, `groupId`, `prefGroupSize`, `bio`) VALUES (?, CONCAT(?, "@utdallas.edu"), ?, ?, ?)', [req.body.username, req.body.username, null, null, null]);
        res.json({ msg: 'User registered successfully' });

    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ msg: 'Duplicate entry. User already exists' });
        }
        console.error(err);
        res.status(500).json({ msg: 'Internal server error' });
    }
});*/
/*{
    "userId" : "ABC123456",
    "firstName": "first",
    "lastName": "last",
    "password": "pass"
}*/
router.post('/register', (req, res) => {
    const { userId, firstName, lastName, password } = req.body;
    const q = "SELECT * FROM user WHERE userId = ?";

    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err);
        const userIdFormat = /^[A-Za-z]{3}\d{6}$/;
        if (!userIdFormat.test(userId)) {
            return res.status(400).json({ msg: 'Invalid userId format. It should be 3 alphabetical letters followed by 6 integers.' });
        }
        if (data.length > 0) return res.status(409).json("User already exists!");

        const insertUserQuery = "INSERT INTO user (userId, firstName, lastName, password) VALUES (?, ?, ?, ?)";
        db.query(insertUserQuery, [userId, firstName, lastName, password], (insertErr, insertData) => {
            if (insertErr) return res.status(500).json(insertErr);

            const insertStudentQuery = "INSERT INTO student (studentId, email) VALUES (?, CONCAT(?, '@utdallas.edu'))";  
                db.query(insertStudentQuery, [userId, userId], (insertStudentErr, insertStudentData) => {
                if (insertStudentErr) return res.status(500).json(insertStudentErr);
                return res.status(201).json("User registered successfully and added to students table!");
            });
        });
    });
});



//student login
router.post('/login', (req, res) => {
    //const { userId, password } = req.body;
    const q = "SELECT * FROM user WHERE userId = ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        if (req.body.password !== data[0].password) {
            return res.status(400).json('Invalid credentials');
        }

        return res.status(200).json("Logged in!");
    });
});


router.get('/group_info', (req, res) => {
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
                pythonPath: pyPath,
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
    const requests = `SELECT * FROM studentProfile WHERE studentId IN ((SELECT receiverId FROM studentrequeststudent WHERE senderId = ?) UNION(SELECT receiverId FROM grouprequeststudent WHERE senderId IN (SELECT groupId FROM student WHERE studentId = ?)))`
    db.query(requests, [studentId,studentId], (err, data) => {
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
    const requests = `select * from groupProfile where groupId in (select receiverId from studentrequestgroup where senderId = ?);`
    db.query(requests, [studentId], (err, data) => {
        if (err) return res.status(500).send(err);
        let formattedData = [];
        let groupIndex = 0
        data.forEach(item => {
            formattedData.push({
                id: item.groupId,
                groupName: item.groupName,
                studentNames:item.members.replace(/"/g, '').split(','),
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
    const invites = `select * from studentProfile where studentId in ((select senderId from studentrequeststudent where receiverId =?) UNION(SELECT senderId FROM studentrequestgroup WHERE receiverId IN (SELECT groupId FROM student WHERE studentId = ?)))`
    db.query(invites, [studentId, studentId], (err, data) => {
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
                bio: JSON.parse(`[${item.bios.replace(/\s+/g, '')}]`),
                emails: item.emails.replace(/"/g, '').split(',')
            });
            groupIndex = groupIndex + 1
        });

        // Send the formatted data as response
        res.status(200).json(formattedData);
    });
})

router.post('/teamUp', (req, res) => {
    var { senderId, receiverId, receiverType, debug } = req.body;
    senderId = debug ? studentId : senderId;
    const tableMap = {
        'ss': 'studentrequeststudent',
        'sg': 'studentrequestgroup',
        'gs': 'grouprequeststudent'
    };
    const check = `select groupId from student where studentId = '${senderId}'`
    let groupId = 0;
    db.query(check, [], (err, data) => {
        if (err) return res.status(500).send(err);
        if (receiverType === "ss" && data.length >= 1 && data[0]["groupId"] != 0) {
            receiverType = "gs";
            senderId = data[0]["groupId"]
        }
        let tableName = tableMap[receiverType];
        if (!tableName) {
            return res.status(400).json("Invalid receiverType");
        }

        const checkQuery = `SELECT *
                            FROM ${tableName}
                            WHERE senderId = ?
                              AND receiverId = ?`;
        db.query(checkQuery, [senderId, receiverId], (checkErr, checkData) => {
            if (checkErr) return res.status(500).send(checkErr);
            if (checkData.length > 0) {
                return res.status(409).json("Invitation already exists");
            }

            const q = `INSERT INTO ${tableName}(\`senderId\`, \`receiverId\`)
                       VALUES (?)`;
            const values = [senderId, receiverId];
            db.query(q, [values], (err, data) => {
                if (err) return res.status(500).send(err);
                return res.status(200).json("Invitation sent from " + senderId + " to " + receiverId);
            });
        });
    });
});

//rejecting invitations
router.post('/denyInvite', (req, res) => {
    var { senderId, receiverId, receiverType, debug } = req.body;
    receiverId = debug ? studentId : receiverId;
    const tableMap = {
        'ss': 'studentrequeststudent',
        'sg': 'studentrequestgroup',
        'gs': 'grouprequeststudent'
    };
    const check = `select groupId from student where studentId = '${receiverId}'`
    let groupId = 0;
    db.query(check, [], (err, data) => {
        if (err) return res.status(500).send(err);
        if (receiverType === "ss" && data.length >= 1 && data[0]["groupId"] != 0) {
            receiverType = "sg";
            receiverId = data[0]["groupId"]
        }
        let tableName = tableMap[receiverType];
        if (!tableName) {
            return res.status(400).json("Invalid receiverType");
        }
        const q = `DELETE
                   FROM ${tableName}
                   WHERE senderId = ?
                     AND receiverId = ?`;
        const values = [senderId, receiverId];
        db.query(q, values, (err, data) => {
            if (err) {
                return res.status(500).send(err);
            }
            console.log(data)
            return res.status(200).json("Invitation from " + senderId + " to " + receiverId + " has been rejected");
        });
    });
});

// Unsend an invitation
router.post('/unsend', (req, res) => {
    var { senderId, receiverId, receiverType, debug } = req.body;
    senderId = debug ? studentId : senderId;
    const tableMap = {
        'ss': 'studentrequeststudent',
        'sg': 'studentrequestgroup',
        'gs': 'grouprequeststudent'
    };
    const check = `select groupId from student where studentId = '${senderId}'`
    let groupId = 0;
    db.query(check, [], (err, data) => {
        if (err) return res.status(500).send(err);
        if(receiverType==="ss" && data.length >= 1 && data[0]["groupId"] !=0) {
            receiverType = "gs";
            senderId = data[0]["groupId"]
        }

        let tableName = tableMap[receiverType];
        if (!tableName) {
            return res.status(400).json("Invalid receiverType");
        }
        const q = `DELETE FROM ${tableName} WHERE senderId = ? AND receiverId = ?`;
        const values = [senderId, receiverId];
        db.query(q, values, (err, data) => {
            if (err) return res.status(500).send(err);
            return res.status(200).json("Invitation from " + senderId + " to " + receiverId + " has been unsent");
        });
    });
});

/*{
    "senderId": "senderIdValue",
    "receiverId": "receiverIdValue",
    "receiverType": "student"
}
*/

// complete
router.post('/accept', (req, res) => {
    let { senderId, receiverId, receiverType, debug } = req.body;
    receiverId = debug ? studentId : receiverId;
    const check = `select groupId from student where studentId = '${receiverId}'`
    let groupId = 0;
    db.query(check, [], (err, data) => {
        if (err) return res.status(500).send(err);
        let temp1;
        let temp2
        if(data.length >= 1 && data[0]["groupId"] !=0){
            groupId = data[0]["groupId"];
            receiverType = "addStudent";
            temp1 = senderId;
            temp2 = receiverId;
            senderId = groupId;
            receiverId = temp1;

        }

        if (receiverType === "group" || receiverType==="addStudent") {
            const q = `update student
                       set groupId=${senderId}
                       where studentId = '${receiverId}'`
            db.query(q, [], (err, data) => {
                if (err) return res.status(500).send(err);
            });

            const rSS = `delete
                         from studentrequeststudent
                         where senderId = '${receiverId}'
                            OR receiverId = '${receiverId}' `
            db.query(rSS, [], (err, data) => {
                if (err) return res.status(500).send(err);
            });
            const rSG = `delete
                         from studentrequestgroup
                         where senderId = '${receiverId}'`
            db.query(rSG, [], (err, data) => {
                if (err) return res.status(500).send(err);
            });
            const rGS = `delete
                         from grouprequeststudent
                         where receiverId = '${receiverId}'`
            db.query(rGS, [], (err, data) => {
                if (err) return res.status(500).send(err);
            });

            return res.status(200).send("member added")

        } else {
            let rand = (Math.random() + 1).toString(36).substring(7);

            const c = `insert into formedGroups(groupSizePref, groupLeader, groupName, groupCompleted)
                       values ((select prefGroupSize from student where studentId = '${senderId}'), '${senderId}', 'Team-${rand}', 0)`

            db.query(c, [], (err, data) => {
                if (err) return res.status(500).send(err);
                const m = `update student
                           set groupId = (select groupId from formedGroups where groupLeader = '${senderId}')
                           where studentId in ('${senderId}', '${receiverId}')`

                db.query(m, [], (err, data) => {
                    if (err) return res.status(500).send(err);
                });
                const p = `insert into grouppreference(groupId, projectNum, projRank)
                           SELECT s.groupId, pp.projectNum, pp.projRank
                           FROM projectpreference pp
                                    JOIN (SELECT groupId FROM student WHERE studentId = '${senderId}') s
                           WHERE pp.studentId = '${senderId}';`
                db.query(p, [], (err, data) => {
                    if (err) return res.status(500).send(err);
                });
                const rSS = `delete
                             from studentrequeststudent
                             where senderId in ('${senderId}', '${receiverId}')
                                OR receiverId in ('${senderId}', '${receiverId}') `
                db.query(rSS, [], (err, data) => {
                    if (err) return res.status(500).send(err);
                });
                const rSG = `delete
                             from studentrequestgroup
                             where senderId in ('${senderId}', '${receiverId}')`
                db.query(rSG, [], (err, data) => {
                    if (err) return res.status(500).send(err);
                });
                const rGS = `delete
                             from grouprequeststudent
                             where receiverId in ('${senderId}', '${receiverId}')`
                db.query(rGS, [], (err, data) => {
                    if (err) return res.status(500).send(err);
                });

                return res.status(200).send("group created")

            });

        }
    });
});


router.post('/remaining_students', (req, res) => {
    var {debug} = req.body;

    //if (debug) return res.status(200).send("debug mode on")

    const s = "SELECT p.studentId, projectNum, projRank FROM projectpreference as p, individualstudents as s where  s.studentId=p.studentId;"
    db.query(s, [], (err, data) => {
        let params = {
            'algType':'rs'
        }
        if (err) return res.status(500).send(err);
        params["studentData"] = data;
        const b = `select varValue from globalVars where varName in ('minMembers','maxMembers') order by varValue asc`
        db.query(b, [], (err, data) => {
            if (err) return res.status(500).send(err);
            // fix min max error
            params['min'] = data[0].varValue;
            params['max'] = data[1].varValue


            const g = "select g.groupId, projectNum, projRank from grouppreference as p, formedGroups as g where p.groupId=g.groupId AND (select count(groupId) from groupInfo as i where i.groupId=g.groupId) < ?  and g.groupId in (select groupId from formedgroups where groupCompleted=False )order by g.groupId asc;\n"

            db.query(g, [params['min']], (err, data) => {
                if (err) return res.status(500).send(err);
                //const s =  "select k.studentId, k.skill from skills k, individualstudents s where s.studentId=k.studentId;"
                params['groupData'] = data;
                let uniqueId = [... new Set(params.groupData.map(item => item.groupId))];
                if (uniqueId.length ==0 ) {
                    uniqueId = [0]
                }
                const m = "select groupId, count(*) as totalMembers from groupInfo where groupId in ? group by groupId"
                db.query(m, [[uniqueId]], (err, data) => {
                    if (err) return res.status(500).send(err);
                    params['memberData'] = data;
                    const stringifieidData = JSON.stringify(params)
                    const options = {
                        pythonPath: '../Database/.venv/Scripts/python.exe',
                        pythonOptions: ['-u'],
                        scriptPath: '../Database/',
                    };
                    const pyShell = new PythonShell('sortAlg.py', options);
                    pyShell.send(stringifieidData);
                    // Handle received data from the Python script
                    pyShell.on('message', (message) => {
                        let resultData = JSON.parse(message);

                        let match = resultData['matches'];
                        let data = match['addMembers']
                        //add members to existing groups that are open and below min
                        for (const groupId in data) {
                            const members = data[groupId].members.flatMap(member => Array.isArray(member) ? member : [member]);
                            const membersList = members.map(member => `'${member}'`).join(',');
                            const q = `update student
                                       set groupId=${groupId}
                                       where studentId in (${membersList})`
                            db.query(q, [], (err, data) => {
                                if (err) return res.status(500).send(err);
                            });
                            const close = `update formedGroups
                                           set groupCompleted = True
                                           where groupId=${groupId}`
                            db.query(close, [], (err, data) => {
                                if (err) return res.status(500).send(err);
                            });
                        }
                        data = match['createGroups']
                        for (const groupId in data) {
                            const members = data[groupId].members.flatMap(member => Array.isArray(member) ? member : [member]);
                            const membersList = members.map(member => `'${member}'`).join(',');
                            const groupLeader = `'${members[0]}'`

                            // create team
                            const c = `insert into formedGroups(groupSizePref, groupLeader,groupCompleted) values ((select prefGroupSize from student where studentId = ${groupLeader}), ${groupLeader},True)`

                            db.query(c, [], (err, data) => {
                                if (err) return res.status(500).send(err);
                                const m = `update student
                                           set groupId = (select groupId from formedGroups where groupLeader=${groupLeader})
                                           where studentId in (${membersList})`
                                db.query(m, [], (err, data) => {
                                    if (err) return res.status(500).send(err);
                                });
                                const p = `insert into grouppreference(groupId,projectNum,projRank)
                                            SELECT s.groupId, pp.projectNum, pp.projRank FROM projectpreference pp
                                                JOIN (SELECT groupId FROM student WHERE studentId = ${groupLeader}) s
                                                WHERE pp.studentId = ${groupLeader};`
                                db.query(p, [], (err, data) => {
                                    if (err) return res.status(500).send(err);
                                });


                            });


                        }
                        return res.status(200).send("All students in a group")


                    });

                    // Handle errors
                    pyShell.on('error', (error) => {
                        return res.status(500).json(error);
                    });

                });
            });
        });

    });
})

//admin tables page
router.get('/admin/group_info', (req, res) => {
    const q = 'SELECT g.groupId, g.groupName as groupName, group_concat(firstName, " ", lastName) as members, count(*) as totalMembers, f.groupCompleted as groupStatus FROM groupinfo as g, formedgroups as f where f.groupId=g.groupId group by g.groupId;'

    db.query(q, [], (err, data) => {
        if (err) return res.status(500).send(err);

        let formattedGroupData = [];
        data.forEach(item => {
            formattedGroupData.push({
                groupId: item.groupId,
                groupName: item.groupName,
                groupMembers: item.members,
                membersCount: item.totalMembers,
                status: item.groupStatus,
                formed: item.formed,
                index: item.index

            });
        });

        var query = `select * from individualstudents`
        db.query(query, [], (err, data) => {
            if (err) return res.status(501).send(err);

            let formattedGroupData2 = [];
            data.forEach(item => {
                formattedGroupData2.push({
                    studentId: item.studentId,
                    firstName: item.firstName,
                    lastName: item.lastName
                });
            });

            let payload = {groups: formattedGroupData, students: formattedGroupData2}

            return res.status(200).json(payload)
        });
    });
})

export default router;
