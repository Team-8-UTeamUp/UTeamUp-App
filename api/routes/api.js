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

app.get('/quiz', (req, res) => {
    res.send(quiz);
});

router.get("/", (req, res) => {
    res.json("Testing");
})

const testing = (req, res) => {
    const q = "SELECT * FROM People";

    db.query(q, [req.body.testing], (err, data) => {
        if (err) return res.json(err);

        if (data.length) return res.status(409).json("User already exists")
    })
}

export default router;