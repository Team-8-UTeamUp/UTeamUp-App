const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

//local host login
const mysql = require('mysql2');  //you may need to change to 'mysql'
const connection = mysql.createConnection({
  host: 'lapogtop',
  user: 'new_user',
  password: 'password',
  database: 'uteamup',
  port: "3306"
});

//connect to database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL server.');
});

const quiz = {
  studentId: '',
  projectpreference: '', 
  rank: '',
  skills: ['Front-End', 'Back-End', 'Full-Stack', 'Database', 'Machine Learning', 'Artificial Intelligence', 'Virtual Reality', 'Mobile Dev', 'Other'],
  languages: ['Java', 'C++', 'Python', 'HTML', 'CSS', 'SQL', 'JavaScript', 'NodeJs', 'Other'],
  exp: ['beg', 'int', 'adv'],
  bio: '',
  prefGroupSize: '',
};

app.post('/quiz', (req, res) => {
  const { studentId, skills, languages, exp, projectpreference, rank, bio, prefGroupSize } = req.body;

  // Validate projectpreference, rank and prefGroupSize
  if (!Number.isInteger(projectpreference) || projectpreference < 1 || projectpreference > 20) {
    return res.status(400).send('Bad project preference. Please enter an integer between 1 and 20.');
  }
  if (!Number.isInteger(rank) || rank < 1 || rank > 5) {
    return res.status(400).send('Bad rank. Please enter an integer between 1 and 5.');
  }
  if (!Number.isInteger(prefGroupSize) || prefGroupSize < 3 || prefGroupSize > 6) {
    return res.status(400).send('Bad group size. Please enter an integer between 3 and 6.');
  }

  // Add skills
  skills.forEach(skills => {
    const sql = `insert into skills(studentId, skill) values('${studentId}', '${skills}')`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log('Skill data inserted');
    });
  });


  // Add languages
  languages.forEach(languages => {
    const sql = `insert into languages(studentId, languages, expLevel) values ('${studentId}', '${languages}', '${exp}')`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log('Language data inserted');
    });
  });

  // Add project preferences
const sqlp = `insert into projectpreference(studentId, projectNum, projRank) values ('${studentId}', ${projectpreference}, ${rank})`;
  connection.query(sqlp, (err, result) => {
  if (err) throw err;
  console.log('Project preference data inserted');
});


 
  // BIO and group size
  const sqlUpdate = `UPDATE student SET prefGroupSize = ?, bio = ? WHERE studentId = ?`;
  const values = [prefGroupSize, bio, studentId];
  
  connection.query(sqlUpdate, values, (err, result) => {
    if (err) throw err;
    console.log('Student groupsize, rank, bio data inserted');
  });
 

  res.send('Quiz submitted successfully.');
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});

/*
{
  "studentId": "EQD275061",
  "skills": ["Front-End", "Back-End", "Database"],
  "projectpreference": "1", 
  "rank": "1",
  "languages": ["Java", "Database", "SQL"],
  "exp": "int",
  "prefGroupSize" : "5",
  "bio": "I like this class so much"
}
*/
