import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Student_Tile from "./student_view/Student_Tile";
import Student_Enlarge from './student_view/Student_Enlarge';




function Home_Page() {
    
    const expandedProfiles = Profiles.map(student => (
        <Student_Enlarge
        //name, skillset, languages, preferences, groupSz, bio
            name={student.name}
            skillset={student.skills}
            languages={student.codingLanguages}
            preferences={student.preferences}
            groupSz={student.groupSizePreference}
            bio={student.bio}
        />
      ));

      const studentTiles = Profiles.map(student => (
        //name, skills, languages, preferences, groupSz
        <Student_Tile 
            sid={student.id}
            name={student.name}
            skills={student.skills}
            languages={student.codingLanguages}
            preferences={student.preferences}
            groupSz={student.groupSizePreference}
            onClick={() => displayInfo(student.id, student.index)} // Pass onClick handler to Student_Tile
        />
      ));

    const [expanded, setExpanded] =  useState(null);

    function displayInfo(uid, ind) {

  
        // This code will run after the DOM has fully loaded
    
          // Reset border color of all elements
          const elements = document.querySelectorAll('.tile');
          elements.forEach(element => {
              element.style.border = "0px";
    
          });
      
          // Find the clicked element and apply the border style
          var chosenTile = document.getElementById(uid);
          if (chosenTile) {
              chosenTile.style.border = "2px solid orange";
              
              setExpanded(expandedProfiles[ind]);
          }
    }

    // Set the initial orange border for the first tile
    React.useEffect(() => {
        const firstTile = document.querySelector('.tile');
        if (firstTile) {
            firstTile.style.border = "2px solid orange";
            setExpanded(expandedProfiles[0]); // Set the expanded profile to the first one
        }
    }, []); // Empty dependency array ensures this effect runs only once

    return (
    <>
    <div class="row">
        <div class="column left">
        <img class="logo" src={require('../assets/logoTeam.png')} title="" alt=""></img>
            <h2>Column 1</h2>
            <div class="sidenav">
                <Link className="link" to="/"><p>TeamUp</p>
                </Link>
                <Link className="link" to="/"><p>Invitations</p>
                </Link>
                <Link className="link" to="/"><p>Requests</p>
                </Link>
                <Link className="link" to="/quiz"><p>Quiz</p>
                </Link>
                <Link className="link" to="/admin"><p>Admin</p>
                </Link>
                <Link className="link" to="/"><p>FAQ</p>
                </Link>
            </div>
        </div>
        <div class="column right">
            <h2>Column 2</h2>
            <p>Some text..</p>
        </div>
    </div>
    
    
    <div class="screen">
      <div class="filerbar">
        <button class="button">Group Size</button>
        <button class="button">Project Preference</button>
        <button class="button">Skills</button>
        <form>
                <input class="outline" type="text" name="search"/>
                <button class="button">search</button>
        </form>                
      </div>
      <div class="screen2"> 
        <div class="split1 screenleft">
            <div class="tilecentered"> 
            {studentTiles}
            </div>
        </div>
        <div class="split2 screenright">
            <div class="centered">
            {expanded}
            </div>
        </div>
      </div>
    </div>
    
    
  </>
    )
}

export default Home_Page;



const Profiles = [ // single student profiles
  {
      name: "Alice Turner",
      id: "p0",
      index:0,
      photo:'../assets/profilePhoto.png',
      codingLanguages: ["JavaScript", "Python"],
      skills: ["Database", "Front End"],
      preferences: [
          ["ProjectA", "ProjectB", "ProjectC", "ProjectD", "ProjectE"],
          ["ProjectB", "ProjectA", "ProjectE", "ProjectC", "ProjectD"]
      ],
      groupSizePreference: 3,
      bio: "I'm a passionate developer with expertise in JavaScript, React, and Node.js. Excited to collaborate on interesting projects!"
  },
  {
      name: "Bob Job",
      id: "p1",
      index:1,
      photo:'../assets/profilePhoto.png',
      codingLanguages: ["Python", "Java"],
      skills: ["AI", "Back End", "UI/UX"],
      preferences: [
          ["ProjectC", "ProjectA", "ProjectE", "ProjectD", "ProjectB"],
          ["ProjectA", "ProjectB", "ProjectD", "ProjectE", "ProjectC"]
      ],
      groupSizePreference: 4,
      bio: "Experienced Python developer with a focus on web development using Django. Eager to contribute to innovative projects!"
  },
  {
      name: "Charlie Manskin",
      id: "p2",
      index:2,
      photo:'../assets/profilePhoto.png',
      codingLanguages: ["HTML", "CSS", "JavaScript"],
      skills: ["Machine Learning", "Front End", "UI/UX"],
      preferences: [
          ["ProjectD", "ProjectC", "ProjectB", "ProjectA", "ProjectE"],
          ["ProjectE", "ProjectD", "ProjectB", "ProjectC", "ProjectA"]
      ],
      groupSizePreference: 2,
      bio: "Frontend developer with expertise in HTML, CSS, and JavaScript. Passionate about creating intuitive user interfaces."
  },
  {
      name: "David West",
      id: "p3",
      index:3,
      photo:'../assets/profilePhoto.png',
      codingLanguages: ["Java", "SQL"],
      skills: ["Back End", "Database"],
      preferences: [
          ["ProjectB", "ProjectA", "ProjectC", "ProjectD", "ProjectE"],
          ["ProjectC", "ProjectB", "ProjectE", "ProjectA", "ProjectD"]
      ],
      groupSizePreference: 5,
      bio: "Experienced Java developer with expertise in Spring Boot and Hibernate. Interested in backend development and system architecture."
  },
  {
      name: "Eve Armiston",
      id: "p4",
      index:4,
      photo:'../assets/profilePhoto.png',
      codingLanguages: ["Ruby", "JavaScript"],
      skills: ["Front End", "UI/UX"],
      preferences: [
          ["ProjectA", "ProjectE", "ProjectC", "ProjectD", "ProjectB"],
          ["ProjectB", "ProjectA", "ProjectD", "ProjectE", "ProjectC"]
      ],
      groupSizePreference: 3,
      bio: "Ruby on Rails developer with experience in building web applications. Enthusiastic about database management and backend development."
  },

  {
    name: "Mandy Moore",
    id: "p5",
    index:5,
    photo:'../assets/profilePhoto.png',
    codingLanguages: ["Node.js", "JavaScript"],
    skills: ["Front End", "Database"],
    preferences: [
        ["ProjectA", "ProjectE", "ProjectC", "ProjectD", "ProjectB"],
        ["ProjectB", "ProjectA", "ProjectD", "ProjectE", "ProjectC"]
    ],
    groupSizePreference: 8,
    bio: "I looooove CS!"
}
];






