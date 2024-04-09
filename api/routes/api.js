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
            //'studentId':req.body.studentId,   //once connected use this version
            'studentId':'AAE297154',
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
                return res.status(200).json(match)
            });

            // Handle errors
            pyShell.on('error', (error) => {
                return res.status(500).send(error);
            });

        });

    });
})

export default router;
