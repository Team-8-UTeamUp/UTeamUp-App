import express from "express"
import {db} from "../db.js"
//import bcrypt from "bcryptjs";

const router = express.Router()
import {PythonShell} from "python-shell";

//const studentId = "AAT229473"
// const studentId = 'ABG222946'
const studentId = "AAE297154"
const pyPath =  '../Database/.venv/Scripts/python.exe' //"../Database/.venv/bin/python"

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

// Question 3 - Top 5 CS Projects
router.post('/quiz/q3', (req, res) => {
    if(req.body.csProjects.length !== 5) {
        return res.status(400).json("Please provide exactly 5 CS Projects");
    }
    const q = "INSERT INTO PROJECTPREFERENCE(`studentId`, `projectNum`, `projRank`) VALUES ?";
    const values = req.body.csProjects.map((project, index) => [req.body.studentId, project, index + 1]);
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json("Question 3 updated for " + req.body.studentId);
    });
});

// Question 4 - Top 5 UTDesign Projects
router.post('/quiz/q4', (req, res) => {
    if(req.body.utdProjects.length !== 5) {
        return res.status(400).json("Please provide exactly 5 UTDesign Projects");
    }
    const q = "INSERT INTO PROJECTPREFERENCE(`studentId`, `projectNum`, `projRank`) VALUES ?";
    const values = req.body.utdProjects.map((project, index) => [req.body.studentId, project, index + 1]);
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json("Question 4 updated for " + req.body.studentId);
    });
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
        let temp = {
            groupName: data[0]['groupName'],
            studentNames:data[0]['members'].replace(/"/g, '').split(','),
            id: data[0]['groupId'],
            emails:data[0]['emails'].replace(/"/g, '').split(','),
            skills: data[0]['skills'].replace(/"/g, '').split(','),
            codingLanguages: data[0]['languages'].replace(/"/g, '').split(','),
            preferences: [data[0]['UTDProjects'].replace(/"/g, '').split(','), data[0]['CSProjects'].replace(/"/g, '').split(',')],
            currentGroupSize: data[0]['totalMembers'],
            preferedGroupSize: data[0]['groupSizePref'],
            bio: JSON.parse(`[${data[0]['bios'].replace(/\s+/g, '')}]`)

                                }
        return res.status(200).json(temp)
    });
})
//STUDENTS PAGE
//get student info
router.get('/student_info', (req, res) => {
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
//for admin(?) - brandon
router.post('/admin', (req, res) => {
    const q = "SELECT * FROM admin WHERE adminId = ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        return res.status(200).json("Logged in!");
    });
});

//student registration
router.post('/register', async (req, res) => {
    const { firstName, lastName, userId, password } = req.body;

    //assume userId is already in database with no name or password
    const existingUser = await db.query('SELECT * FROM users WHERE userId = ?', [userId]);
    if (!existingUser || existingUser.firstName || existingUser.lastName || (existingUser.password && existingUser.password !== '')) {
        return res.status(400).json({ msg: 'User already exists or user details already set' });
    }

    //const salt = await bcrypt.genSalt(10);
    //const hashedPassword = await bcrypt.hash(password, salt);

    await db.query('UPDATE users SET firstName = ?, lastName = ?, password = ? WHERE userId = ?', [firstName, lastName, hashedPassword, userId]);

    res.json({ msg: 'User details updated successfully' });
});

//student login
router.post('/login', async (req, res) => {
    const { userId, password } = req.body;

    const user = await db.query('SELECT * FROM users WHERE userId = ?', [userId]);
    if (!user) {
        return res.status(400).json({ msg: 'User does not exist' });
    }

    /*const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
    }*/
    if (password !== user.password) {   //non decrpyted isMatch
        return res.status(400).json({ msg: 'Invalid credentials' });
    }

    console.log(`${user.firstName} ${user.lastName} has logged in. (but actually that was a lie)`);

    //create user session(?)
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

//sending invitations
router.post('/teamUp', (req, res) => {
    const { senderId, receiverId, receiverType } = req.body;
    let tableName = receiverType === 'student' ? 'studentrequeststudent' : 'studentrequestgroup';
    const q = `INSERT INTO ${tableName}(\`senderId\`, \`receiverId\`) VALUES (?)`;
    const values = [senderId, receiverId];
    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).json("Invitation sent from " + senderId + " to " + receiverId);
    });
});

//rejecting invitations
router.post('/denyInvite', (req, res) => {
    const { senderId, receiverId, receiverType } = req.body;
    let tableName = receiverType === 'student' ? 'studentrequeststudent' : 'studentrequestgroup';
    const q = `DELETE FROM ${tableName} WHERE senderId = ? AND receiverId = ?`;
    const values = [senderId, receiverId];
    db.query(q, values, (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).json("Invitation from " + senderId + " to " + receiverId + " has been rejected");
    });
});

//unsend invitations
router.post('/unsendInvite', (req, res) => {
    const { senderId, receiverId, receiverType } = req.body;
    let tableName = receiverType === 'student' ? 'studentrequeststudent' : 'studentrequestgroup';
    const q = `DELETE FROM ${tableName} WHERE senderId = ? AND receiverId = ?`;
    const values = [senderId, receiverId];
    db.query(q, values, (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).json("Invitation from " + senderId + " to " + receiverId + " has been rejected");
    });
});




// complete
router.post('/accept', (req, res) => {
    const { senderId, receiverId, receiverType } = req.body;

    if (receiverType === "group"){
        const q = `update student set groupId=${senderId} where studentId = '${receiverId}'`

        db.query(q, [], (err, data) => {
            if (err) return res.status(500).send(err);
        });

        const rSS = `delete from studentrequeststudent where senderId ='${receiverId}' OR receiverId= '${receiverId}' `
        db.query(rSS, [], (err, data) => {
                if (err) return res.status(500).send(err);
            });
        const rSG = `delete from studentrequestgroup where senderId ='${receiverId}'`
        db.query(rSG, [], (err, data) => {
                if (err) return res.status(500).send(err);
            });
        const rGS = `delete from grouprequeststudent where receiverId ='${receiverId}'`
        db.query(rGS, [], (err, data) => {
                if (err) return res.status(500).send(err);
            });

        return res.status(200).send("member added")

    }
    else {
        const c = `insert into formedGroups(groupSizePref, groupLeader)
                   values ((select prefGroupSize from student where studentId = '${senderId}'), '${senderId}')`

        db.query(c, [], (err, data) => {
            if (err) return res.status(500).send(err);
            const m = `update student set groupId = (select groupId from formedGroups where groupLeader = '${senderId}') where studentId in ('${senderId}', '${receiverId}')`

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
/*{
    "senderId": "senderIdValue",
    "receiverId": "receiverIdValue",
    "receiverType": "student"
}
*/

router.post('/remaining_students', (req, res) => {
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

            const g = "select g.groupId, projectNum, projRank from grouppreference as p, formedGroups as g where p.groupId=g.groupId AND (select count(groupId) from groupInfo as i where i.groupId=g.groupId) < ? order by g.groupId asc;"

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
                            const c = `insert into formedGroups(groupSizePref, groupLeader) values ((select prefGroupSize from student where studentId = ${groupLeader}), ${groupLeader})`

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


export default router;
