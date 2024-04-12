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
    const p =  "SELECT p.studentId, projectNum, projRank FROM projectpreference as p, individualstudents as s where  s.studentId=p.studentId;"

    db.query(p, [], (err, data) => {
        let params = {
            'studentId':"AAS286443",   //once connected use this version
            'algType':'s2s'
        }
        if (err) return res.status(500).send(err);
        params["projData"] = data;

        const s = "select k.studentId, k.skill from skills k, individualstudents s where s.studentId=k.studentId;"

        db.query(s, [], (err, data) => {
            if (err) return res.status(500).send(err);
            //const s =  "select k.studentId, k.skill from skills k, individualstudents s where s.studentId=k.studentId;"
            params['skillData'] = data
            const stringifieidData = JSON.stringify(params)
            const options = {
                pythonPath: '../Database/.venv/bin/python',
                pythonOptions: ['-u'],
                scriptPath: '../Database/',
            };

            const pyShell = new PythonShell('sortAlg.py', options);
            pyShell.send(stringifieidData);
            // Handle received data from the Python script
            pyShell.on('message', (message) => {
                let resultData = JSON.parse(message);

                let match = resultData['matches'];
                const profileQuery = `SELECT 
                                    combined.studentId,
                                    combined.UTDProjects,
                                    combined.CSProjects,
                                    details.languages,
                                    details.skills,
                                    details.name,
                                    details.bio,
                                    details.prefGroupSize
                                FROM (
                                    SELECT 
                                        s.studentId, 
                                        GROUP_CONCAT('"',
                                            CASE 
                                                WHEN p.projType = 'UTDProject' THEN p.title 
                                                ELSE NULL 
                                            END 
                                            ORDER BY s.projRank SEPARATOR '",') AS UTDProjects,
                                        GROUP_CONCAT('"',
                                            CASE 
                                                WHEN p.projType = 'CSProject' THEN p.title 
                                                ELSE NULL 
                                            END 
                                            ORDER BY s.projRank SEPARATOR '",') AS CSProjects
                                    FROM 
                                        projectPreference AS s 
                                    JOIN 
                                        project AS p ON p.projectNum = s.projectNum 
                                    GROUP BY 
                                        s.studentId
                                ) AS combined
                                JOIN (
                                    SELECT
                                        s.studentId, 
                                        GROUP_CONCAT(DISTINCT CONCAT('"', l.languages, '"')) AS languages,  
                                        GROUP_CONCAT(DISTINCT CONCAT('"', sk.skill, '"')) AS skills,
                                        CONCAT(u.firstName, ' ', u.lastName) AS name,
                                        s.bio,
                                        s.prefGroupSize
                                    FROM 
                                        student s
                                    JOIN 
                                        languages l ON s.studentId = l.studentId
                                    JOIN 
                                        skills sk ON s.studentId = sk.studentId
                                    JOIN 
                                        user u ON s.studentId = u.userId
                                    GROUP BY 
                                        s.studentId
                                ) AS details ON combined.studentId = details.studentId
                                WHERE
                                    combined.studentId IN ?;`
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
                                index:studentIndex,
                                bio: searchResultsProfile[0]['bio'],
                                groupSizePreference: searchResultsProfile[0]['prefGroupSize'],
                                skills: searchResultsProfile[0]['skills'].replace(/"/g, '').split(','),
                                codingLanguages: searchResultsProfile[0]['languages'].replace(/"/g, '').split(','),
                                preferences: [searchResultsProfile[0]['UTDProjects'].replace(/"/g, '').split(','),searchResultsProfile[0]['CSProjects'].replace(/"/g, '').split(',')]
                            }

                            studentIndex = studentIndex +1;

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
    const q = "SELECT g.groupId, g.groupName as groupName, group_concat( firstName , lastName ) as members, count(*) as totalMembers, f.groupCompleted as groupStatus FROM groupinfo as g, formedgroups as f where f.groupId=g.groupId group by g.groupId;"
    //add white space in the group_concat in between the names
    // gets group id, name, members (firstName,lastName), # of members, groupStatus, and formedgroup?
    db.query(q, [], (err, data) => {
        if (err) return res.status(500).send(err);
        
        return res.status(200).json(data);
    });
})



export default router;
