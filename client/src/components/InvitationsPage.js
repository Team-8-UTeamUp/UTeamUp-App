import { Link } from 'react-router-dom';
import React, {useState} from 'react'
import Student from './StudentView/Student';
import NavBar from './NavBar';
import FilterBar from './FilterBar';
import Group from './GroupView/Group';




function Invitations_Page() {
    const acceptButton = <button class="teamupbutton" style={{backgroundColor: "green"}}> Accept</button>
    const rejectButton= <button class="teamupbutton" style={{backgroundColor: "red"}}>Reject</button>
    const StudentView = <Student button1={acceptButton} button2={rejectButton} Profiles={StudentProfiles}/>;
    const GroupView = <Group button1={acceptButton} button2={rejectButton} Profiles={GroupProfiles}/>;
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
            <h2>Invitations Recieved</h2>
            <div style={{display: "flex", flexDirection: "row", gap:"200px", justifyContent:"center", marginTop:"20px"}}>
                <button class="pageswitchbutton" id="sprofbutton" style={{margin:"0px"}} onClick={() => showView("sprofbutton")}>Student Invitations</button>
                <button class="pageswitchbutton" id="gprofbutton" style={{margin:"0px"}} onClick={() => showView("gprofbutton")} >Student Group Invitations</button>
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

export default Invitations_Page;

const StudentProfiles = [ // single student profiles
  {
    name: "Franklin Smith",
    id: "p6",
    index: 0,
    photo: '../assets/profilePhoto.png',
    codingLanguages: ["C++", "Python", "JavaScript"],
    skills: ["Machine Learning", "Database", "Front-End"],
    preferences: [
      ["ProjectB", "ProjectC", "ProjectD", "ProjectE", "ProjectA"],
      ["ProjectA", "ProjectD", "ProjectC", "ProjectB", "ProjectE"]
    ],
    groupSizePreference: 4,
    bio: "Versatile software engineer proficient in C++, Python, and JavaScript. Experienced in machine learning and database management. Passionate about frontend development."
  },
  {
    name: "Grace Lee",
    id: "p7",
    index: 1,
    photo: '../assets/profilePhoto.png',
    codingLanguages: ["Java", "HTML", "CSS"],
    skills: ["Back-End", "Front-End", "UI/UX"],
    preferences: [
      ["ProjectC", "ProjectA", "ProjectE", "ProjectB", "ProjectD"],
      ["ProjectB", "ProjectD", "ProjectA", "ProjectE", "ProjectC"]
    ],
    groupSizePreference: 3,
    bio: "Java developer with a strong background in HTML and CSS. Specialized in backend and frontend development with a keen eye for UI/UX design."
  },

  {
    name: "Isabella Martinez",
    id: "p8",
    index: 2,
    photo: '../assets/profilePhoto.png',
    codingLanguages: ["Java", "JavaScript"],
    skills: ["Back-End", "UI/UX"],
    preferences: [
      ["ProjectA", "ProjectC", "ProjectB", "ProjectE", "ProjectD"],
      ["ProjectD", "ProjectB", "ProjectE", "ProjectA", "ProjectC"]
    ],
    groupSizePreference: 5,
    bio: "Java and JavaScript developer with expertise in backend development and UI/UX design. Committed to delivering high-quality software solutions."
  },

  {
    name: "Jackson Brown",
    id: "p9",
    index: 3,
    photo: '../assets/profilePhoto.png',
    codingLanguages: ["C#", "HTML", "CSS", "JavaScript"],
    skills: ["Back-End", "Front-End", "Database"],
    preferences: [
      ["ProjectE", "ProjectD", "ProjectC", "ProjectB", "ProjectA"],
      ["ProjectA", "ProjectB", "ProjectC", "ProjectD", "ProjectE"]
    ],
    groupSizePreference: 6,
    bio: "Full-stack developer proficient in C#, HTML, CSS, and JavaScript. Experienced in backend and frontend development as well as database management."
  },
  {
    name: "Olivia Taylor",
    id: "p10",
    index: 4,
    photo: '../assets/profilePhoto.png',
    codingLanguages: ["Swift", "Python"],
    skills: ["Mobile Development", "AI"],
    preferences: [
      ["ProjectC", "ProjectE", "ProjectA", "ProjectB", "ProjectD"],
      ["ProjectD", "ProjectA", "ProjectE", "ProjectC", "ProjectB"]
    ],
    groupSizePreference: 3,
    bio: "Passionate iOS developer with expertise in Swift and Python. Specialized in mobile app development and artificial intelligence."
  },
  {
    name: "William Rodriguez",
    id: "p11",
    index: 5,
    photo: '../assets/profilePhoto.png',
    codingLanguages: ["Ruby", "JavaScript"],
    skills: ["Back-End", "Front-End"],
    preferences: [
      ["ProjectA", "ProjectB", "ProjectC", "ProjectD", "ProjectE"],
      ["ProjectB", "ProjectA", "ProjectE", "ProjectD", "ProjectC"]
    ],
    groupSizePreference: 4,
    bio: "Ruby and JavaScript developer with a focus on backend and frontend development. Committed to writing clean, maintainable code."
  },
  {
    name: "Sophia Hernandez",
    id: "p12",
    index: 6,
    photo: '../assets/profilePhoto.png',
    codingLanguages: ["Python", "JavaScript"],
    skills: ["Database", "Front-End"],
    preferences: [
      ["ProjectD", "ProjectB", "ProjectE", "ProjectA", "ProjectC"],
      ["ProjectA", "ProjectC", "ProjectB", "ProjectE", "ProjectD"]
    ],
    groupSizePreference: 5,
    bio: "Python and JavaScript developer with expertise in database management and frontend development. Enthusiastic about creating user-friendly interfaces."
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