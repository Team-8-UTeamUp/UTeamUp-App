import { Link } from 'react-router-dom';
import {React, useState} from 'react'
import Student from './StudentView/Student';
import NavBar from './NavBar';
import FilterBar from './FilterBar';



function Requests_Page() {
    const unsendInvite = <button class="teamupbutton" style={{backgroundColor: "gray"}}>Unsend</button>
    return (
    <>
    <div class="row">
        <div class="column left">
          <NavBar/>
        </div>
        <div class="column right">
            <h2>Requests Sent</h2>
            <div style={{display: "flex", flexDirection: "row", gap:"200px", justifyContent:"center", marginTop:"20px"}}>
                <button class="pageswitchbutton" style={{margin:"0px"}}>Student Requests</button>
                <button class="pageswitchbutton" style={{margin:"0px"}}>Group Requests</button>
            </div>
        </div>
    </div>
    
    <div class="screen">
      <FilterBar/>
      <Student 
        button1={unsendInvite} 
        Profiles={Profiles}/>
    </div>
    
    
  </>
    )
}

export default Requests_Page;

const Profiles = [ // single student profiles
{
    name: "Liam Martinez",
    id: "p13",
    index: 0,
    photo: '../assets/profilePhoto.png',
    codingLanguages: ["Java", "JavaScript", "HTML"],
    skills: ["Back-End", "Front-End", "UI/UX"],
    preferences: [
      ["ProjectC", "ProjectA", "ProjectE", "ProjectB", "ProjectD"],
      ["ProjectD", "ProjectB", "ProjectA", "ProjectC", "ProjectE"]
    ],
    groupSizePreference: 6,
    bio: "Java and JavaScript developer with a passion for backend and frontend development. Skilled in HTML and dedicated to creating intuitive user interfaces."
  },
  {
    name: "Emma Lopez",
    id: "p14",
    index: 1,
    photo: '../assets/profilePhoto.png',
    codingLanguages: ["Python"],
    skills: ["AI", "Machine Learning"],
    preferences: [
      ["ProjectE", "ProjectC", "ProjectD", "ProjectB", "ProjectA"],
      ["ProjectA", "ProjectB", "ProjectC", "ProjectD", "ProjectE"]
    ],
    groupSizePreference: 7,
    bio: "Python developer specializing in AI and machine learning. Dedicated to leveraging technology to solve complex problems and drive innovation."
  },
  {
    name: "Henry Johnson",
    id: "p15",
    index: 2,
    photo: '../assets/profilePhoto.png',
    codingLanguages: ["Python", "JavaScript", "Ruby"],
    skills: ["Database", "Mobile Development"],
    preferences: [
      ["ProjectE", "ProjectD", "ProjectA", "ProjectB", "ProjectC"],
      ["ProjectA", "ProjectC", "ProjectD", "ProjectB", "ProjectE"]
    ],
    groupSizePreference: 7,
    bio: "Seasoned developer proficient in Python, JavaScript, and Ruby. Specialized in database management and mobile app development."
  }
]