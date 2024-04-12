import { Link } from 'react-router-dom';
import React, {useState} from 'react'
import Student from './StudentView/Student';
import NavBar from './NavBar';
import FilterBar from './FilterBar';
import Group from './GroupView/Group'
import MyGroup from './GroupView/MyGroup'



function Home_Page() {
  const TeamUpButton = <button class="teamupbutton" style={{backgroundColor: "#FC8E28"}}>Team Up</button>
  const StudentView = <Student button1={TeamUpButton} Profiles={StudentProfiles}/>;
  const GroupView = <Group button1={TeamUpButton} Profiles={GroupProfiles}/>;
  /*const GroupView = 
    <MyGroup 
        groupName={group.groupName}
        studentNames={group.studentNames}
        skillset={group.skills}
        languages={group.codingLanguages}
        preferences={group.preferences}
        currGroupSz={group.currentGroupSize}
        prefGroupSz={group.preferedGroupSize}
        bios={group.bio}
        button1={null}
        button2={null} 
    />;*/
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
            <h2>Home</h2>
            <div style={{display: "flex", flexDirection: "row", gap:"200px", justifyContent:"center", marginTop:"20px"}}>
                <button className="pageswitchbutton" id="sprofbutton" style={{margin:"0px"}} onClick={() => showView("sprofbutton")}>Student Profiles</button>
                <button className="pageswitchbutton" id="gprofbutton" style={{margin:"0px"}} onClick={() => showView("gprofbutton")} >Group Profiles</button>
            </div>
        </div>
    </div>
    
    <div className="screen">
      <FilterBar/>
      {CurrentView}
    </div>
    
    
  </>
    )

}

// single student profiles
const StudentProfiles = [ 
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
    skills: ["Database", "AI", "Machine Learning", "Front-End", "Back-End"],
    preferences: [
        ["ProjectA", "ProjectE", "ProjectC", "ProjectD", "ProjectB"],
        ["ProjectB", "ProjectA", "ProjectD", "ProjectE", "ProjectC"]
    ],
    groupSizePreference: 6,
    bio: "I looooove CS!"
  }
];


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

const group =
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


export default Home_Page;



