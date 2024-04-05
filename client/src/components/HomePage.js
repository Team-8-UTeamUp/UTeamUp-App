import { Link } from 'react-router-dom';
import {React, useState} from 'react'
import Student from './StudentView/Student';
import NavBar from './NavBar';
import FilterBar from './FilterBar';



function Home_Page() {
  const teamUpButton = <button class="teamupbutton" style={{backgroundColor: "#FC8E28"}}>Team Up</button>
    return (
    <>
    <div class="row">
        <div class="column left">
          <NavBar/>
        </div>
        <div class="column right">
            <h2>Home</h2>
            <div style={{display: "flex", flexDirection: "row", gap:"200px", justifyContent:"center", marginTop:"20px"}}>
                <button class="pageswitchbutton" style={{margin:"0px"}}>Student Profiles</button>
                <button class="pageswitchbutton" style={{margin:"0px"}}>Group Profiles</button>
            </div>
        </div>
    </div>
    
    
    <div class="screen">
      <FilterBar/>
      <Student 
        button1={teamUpButton}
        Profiles={Profiles}/>
    </div>
    
    
  </>
    )

}


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
    groupSizePreference: 6,
    bio: "I looooove CS!"
  }
];

export default Home_Page;



