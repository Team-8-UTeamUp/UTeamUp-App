import { Link } from 'react-router-dom';
import React, {useState} from 'react'
import Student from './StudentView/Student';
import NavBar from './NavBar';
import FilterBar from './FilterBar';
import Group from './GroupView/Group'
import MyGroup from './GroupView/MyGroup';
import axios from "axios"



function Home_Page () {
  const [StudentProfiles, setStudents] = useState([])
  const [GroupProfiles, setGroups] = useState([])
  const [MyGroupProfile, setMyGroup] = useState([])
  const [isLoading, setLoading] = useState(true);
  const [groupLoading, setGLoading] = useState(true);
  const [myGroupLoading, setMyGroupLoading] = useState(true);
  const [hasGroup, setHasGroup] = useState(false);

  React.useEffect(() => {

    const fetchMyGroup = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/group_profile`);
        if (res.data === null) {
          setMyGroup([]);
        } else {
          setMyGroup(res.data);
          setHasGroup(true);
        }

        setMyGroupLoading(false)
      } catch (err) {
        console.log(err);
      }
    }

    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/student_info/`);
        setStudents(res.data);
        setLoading(false)
      } catch (err) {
        console.log(err);
      }
    }

    const fetchGroup = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/group_info/`);
        setGroups(res.data);
        setGLoading(false)
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
    fetchGroup();
    fetchMyGroup();
  }, []);

  if (isLoading && groupLoading  && myGroupLoading) {
    return <Home_Page_Render isLoading={true}/>;
  }

  return (
    <Home_Page_Render StudentProfiles={StudentProfiles} GroupProfiles={GroupProfiles} MyGroupProfile={MyGroupProfile} isLoading={false} hasGroup={hasGroup}/>
  )
}


function Home_Page_Render({StudentProfiles, GroupProfiles, MyGroupProfile, isLoading, hasGroup}) {
  if (isLoading) {
    return (
      <>
        <div class="row">
          <div class="column left">
            <NavBar />
          </div>
          <div class="column right">
            <h2>Home</h2>
            <div style={{display: "flex", flexDirection: "row", gap:"200px", justifyContent:"center", marginTop:"20px"}}>
              <button className="pageswitchbutton" id="sprofbutton" style={{margin:"0px"}} >Student Profiles</button>
              <button className="pageswitchbutton" id="gprofbutton" style={{margin:"0px"}} >My Group Profile</button>
              
              
             
            </div>
          </div>
        </div>
        <div className="screen">
          <FilterBar />
          <h2>Loading...</h2>
        </div>
      </>
    )
  }


  const StudentView = <Student Profiles={StudentProfiles} Page={"student"}/>;
  const GroupView = hasGroup? (
  
    <MyGroup
      groupId = {MyGroupProfile.id}
      groupName={MyGroupProfile.groupName}
      studentNames={MyGroupProfile.studentNames}
      skillset={MyGroupProfile.skills}
      languages={MyGroupProfile.codingLanguages}
      preferences={MyGroupProfile.preferences}
      currGroupSz={MyGroupProfile.currentGroupSize}
      prefGroupSz={MyGroupProfile.preferedGroupSize}
      bios={MyGroupProfile.bio}
      emails={MyGroupProfile.emails}
      />
    
  ) : (
    <Group Profiles={GroupProfiles} />
  );

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
                  {hasGroup ? ( // If user is in a group, change tab to "My Group Profile"
                    <button className="pageswitchbutton" id="gprofbutton" style={{margin:"0px"}} onClick={()=> showView("gprofbutton")}>My Group Profile</button>
                  ):(
                    <button className="pageswitchbutton" id="gprofbutton" style={{margin:"0px"}} onClick={()=> showView("gprofbutton")}>Group Profiles</button>
                  )}
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


export default Home_Page;



