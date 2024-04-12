import { Link } from 'react-router-dom';
import React, {useState} from 'react'
import Student from './StudentView/Student';
import NavBar from './NavBar';
import FilterBar from './FilterBar';
import Group from './GroupView/Group'
import axios from "axios"
import MyGroup from './GroupView/MyGroup'


function Home_Page () {
  const [StudentProfiles, setStudents] = useState([])
  const [isLoading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/student/info/`);
        setStudents(res.data);
        setLoading(false)
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <Home_Page_Render isLoading={true}/>;
  }

  return (
    <Home_Page_Render StudentProfiles={StudentProfiles} isLoading={false}/>
  )
}


function Home_Page_Render({StudentProfiles, isLoading}) {
  if (isLoading) {
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
              <button className="pageswitchbutton" id="gprofbutton" style={{margin:"0px"}} onClick={() => showView("gprofbutton")}>Group Profiles</button>
          </div>
      </div>
  </div>
  
  <div className="screen">
    <FilterBar/>
    <h2>Loading...</h2>
  </div>
  
  
</>
    )
  }


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

  function showView(uid) {

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


export default Home_Page;



