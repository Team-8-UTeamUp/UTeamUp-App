import { Link } from 'react-router-dom';
import React, {useState} from 'react'
import Student from './StudentView/Student';
import NavBar from './NavBar';
import FilterBar from './FilterBar';
import Group from './GroupView/Group';



function Requests_Page() {
    const unsendInvite = <button class="teamupbutton" style={{backgroundColor: "gray"}}>Unsend</button>
    const StudentView = <Student button1={unsendInvite} Profiles={StudentProfiles}/>;
    const GroupView = <Group button1={unsendInvite} Profiles={GroupProfiles}/>;
    const [CurrentView, setCurrentView] =  useState(null);
    function showView(uid)
  {

     // Reset border color of all elements
     const elements = document.querySelectorAll('.pageswitchbutton');
     elements.forEach(element => {
         element.classList.remove('pageswitchselect');
     });

     var selected = document.getElementById(uid);
     if (selected) {
      selected.classList.add('pageswitchselect');
         
       if(uid == "sprofbutton")
         setCurrentView(StudentView);
       else
        setCurrentView(GroupView);
    }

  }

   // Set the inital green underline for student view button
   React.useEffect(() => {
    const initialView = document.getElementById('sprofbutton');
    if (initialView ) {
        initialView.classList.add("pageswitchselect");
        setCurrentView(StudentView); // Set the current view to student 
    }
}, []); // Empty dependency array ensures this effect runs only once

    return (
    <>
    <div class="row">
        <div class="column left">
          <NavBar/>
        </div>
        <div class="column right">
            <h2>Requests Sent</h2>
            <div style={{display: "flex", flexDirection: "row", gap:"200px", justifyContent:"center", marginTop:"20px"}}>
                <button class="pageswitchbutton" id="sprofbutton" style={{margin:"0px"}} onClick={() => showView("sprofbutton")}>Student Requests</button>
                <button class="pageswitchbutton" id="gprofbutton" style={{margin:"0px"}} onClick={() => showView("gprofbutton")}>Group Requests</button>
            </div>
        </div>
    </div>
    
    <div class="screen">
      <FilterBar/>
      {CurrentView}
    </div>
    
    
  </>
    )
}

export default Requests_Page;

const StudentProfiles = [ // single student profiles
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

// Group profiles
const GroupProfiles=
[

  {
    groupName: "Avalanche1",
    studentNames:["Alice Turner", "Bob Job"],
    id: "g0",
    index:0,
    codingLanguages: ["JavaScript", "Python", "C++", "HTML"],
    skills: ["Database", "Front End", "Back End", "UI/UX"],
    preferences: [
        ["ProjectA", "ProjectB", "ProjectC", "ProjectD", "ProjectE"],
        ["ProjectB", "ProjectA", "ProjectE", "ProjectC", "ProjectD"]
    ],
    currentGroupSize: 2,
    preferedGroupSize: 3,
    bio: [
      ["I'm a passionate developer with expertise in JavaScript, React, and Node.js. Excited to collaborate on interesting projects!"],
      [ "Experienced Python developer with a focus on web development using Django. Eager to contribute to innovative projects!"]
    ]
  }
 
]