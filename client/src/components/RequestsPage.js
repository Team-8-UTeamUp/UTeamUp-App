import { Link } from 'react-router-dom';
import React, {useState} from 'react'
import Student from './StudentView/Student';
import NavBar from './NavBar';
import FilterBar from './FilterBar';
import Group from './GroupView/Group';
import axios from "axios"

function Requests_Page() {
  const [StudentProfiles, setStudents] = useState([])
  const [GroupProfiles, setGroups] = useState([])
  const [isLoading, setLoading] = useState(true);
  const [groupLoading, setGLoading] = useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/requests/student_info`);
        setStudents(res.data);
        setLoading(false)
      } catch (err) {
        console.log(err);
      }
    }

    const fetchGroup = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/requests/group_info`);
        setGroups(res.data);
        setGLoading(false)
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
    fetchGroup();
  }, []);

  if (isLoading && groupLoading) {
    return <Requests_Page_Render isLoading={true}/>;
  }

  return (
    <Requests_Page_Render StudentProfiles={StudentProfiles} GroupProfiles={GroupProfiles} isLoading={false}/>
  )
}

function Requests_Page_Render({StudentProfiles, GroupProfiles, isLoading}) {
    if (isLoading) {
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
          <h2>Loading...</h2>
        </div>
        
        
      </>
        )
    }

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