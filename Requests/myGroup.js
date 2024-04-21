const express = require('express');
const app = express();

//local host login
const mysql = require('mysql');  //you may need to change to 'mysql'
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'pleasework123',
  database: 'uteamup',
  port: "3306"
});


//connect to database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL server.');
});

//bring up data based on student ID
app.get('/group/:studentId', (req, res) => {
  const { studentId } = req.params;


  //SQL Query
  const sql = `
    SELECT 
    f.groupId, 
    GROUP_CONCAT(DISTINCT gl.languages) AS languages, 
    GROUP_CONCAT(DISTINCT gp.projectNum) AS projectNums, 
    GROUP_CONCAT(DISTINCT gp.projRank) AS projRanks, 
    GROUP_CONCAT(DISTINCT gs.skill) AS skills
    FROM formedgroups f
    JOIN grouplang gl ON f.groupId = gl.groupId
    JOIN grouppreference gp ON f.groupId = gp.groupId
    JOIN groupskills gs ON f.groupId = gs.groupId
    WHERE f.groupId IN (
        SELECT groupId
        FROM student
        WHERE studentId = ?
    )
    GROUP BY f.groupId;`
;

connection.query(sql, [studentId], (err, results) => {
    if (err) throw err;
    results = results.map(result => {
      result.skills = result.skills.split(',').map(skill => skill.replace(/^\"|\"$/g, ''));
      return result;
  });

    res.send(results);
  });
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});

// http://localhost:3000/group/studentID