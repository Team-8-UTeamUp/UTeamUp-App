import express from "express"
import {db} from "../db.js"

const router = express.Router()

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

export default router;