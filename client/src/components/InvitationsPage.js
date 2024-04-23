import { Link } from 'react-router-dom';
import React, {useState} from 'react'
import Student from './StudentView/Student';
import NavBar from './NavBar';
import FilterBar from './FilterBar';
import Group from './GroupView/Group';
import MyGroup from './GroupView/MyGroup'
import axios from "axios"
import {containerClasses} from "@mui/material";

function Invitations_Page() {
  const [StudentProfiles, setStudents] = useState([])
  const [GroupProfiles, setGroups] = useState([])
  const [isLoading, setLoading] = useState(true);
  const [groupLoading, setGLoading] = useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/invites/student_info`);
        setStudents(res.data);
        setLoading(false)
      } catch (err) {
        console.log(err);
      }
    }

    const fetchGroup = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/invites/group_info`);
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
    return <Invitations_Page_Render isLoading={true}/>;
  }

  return (
    <Invitations_Page_Render StudentProfiles={StudentProfiles} GroupProfiles={GroupProfiles} isLoading={false}/>
  )
}

function Invitations_Page_Render({StudentProfiles, GroupProfiles, isLoading}) {
    if (isLoading) {
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
            <h2>Loading...</h2>
          </div>
        </>
      )
    }
    const studentId = "AAE297154";
    const [params, setParams] = useState({
        senderId: "VDW219689", // Initialize senderId as empty string
        receiverId: studentId,
        receiverType: "student" // Default value
    });
    const handleAccept = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:8800/api/accept", {senderId: params['senderId'], receiverId: params['receiverId'], receiverType:params['receiverType']})
            console.log(res)
            // refresh page automatically
            location.href=location.href
        } catch (err) {
            console.log(err)
        }
    }


    const rejectButton= true
    const StudentView = <Student button2={rejectButton} Profiles={StudentProfiles} Page={"student"} />;
    const GroupView = <Group button2={rejectButton} Profiles={GroupProfiles} />

    /*<Group button1={acceptButton} button2={rejectButton} Profiles={GroupProfiles}/>;*/
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
         if (uid === "sprofbutton") {
             setCurrentView(StudentView);
             setParams(prevParams => {
                 console.log("changed to student");
                 return { ...prevParams, receiverType: "student" }; // Return the updated state
             });
             console.log(params)
         } else {
             setCurrentView(GroupView);
             setParams(prevParams => {
                 console.log("changed to group");
                 return { ...prevParams, receiverType: "group" }; // Return the updated state
             });
              console.log(params);
         }
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