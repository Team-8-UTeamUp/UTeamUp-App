const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'lapogtop',
  user: 'new_user',
  password: 'password',
  database: 'uteamup',
  port: "3306"
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL server.');
});

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

app.post('/quiz', (req, res) => {
  const { studentId, skills, languages, exp, projectpreference, rank, bio, groupsize } = req.body;

  // Add skills
  skills.forEach(skills => {
    const sql = `insert into skills(studentId, skill) values('${studentId}', '${skills}')`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log('Skill data inserted:', result.insertId);
    });
  });


  // Add languages
  languages.forEach(languages => {
    const sql = `insert into languages(studentId, languages, expLevel) values ('${studentId}', '${languages}', '${exp}')`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log('Language data inserted:', result.insertId);
    });
  });

  // Add project preferences
const sqlp = `insert into projectpreference(studentId, projectNum, projRank) values ('${studentId}', ${projectpreference}, ${rank})`;
  connection.query(sqlp, (err, result) => {
  if (err) throw err;
  console.log('Project preference data inserted:', result.insertId);
});


 
  /* BIO
const sqlb = `insert into student(studentId, prefGroupSize, bio) values ('${studentId}',  '${groupsize}', '${bio}')`;
  connection.query(sqlb, (err, result) => {
    if (err) throw err;
    console.log('Bio data inserted:', result.insertId);
  }); 
 */

  res.send('Quiz submitted successfully.');
});

app.listen(3000);

/*
{
  "studentId": "FWR250465",
  "skills": ["Front-End", "Back-End", "Database"],
  "projectpreference": "1", 
  "rank": "1",
  "languages": ["Java", "Database", "SQL"],
  "exp": "int"
}
"bio": "I like this class so much",
*/
