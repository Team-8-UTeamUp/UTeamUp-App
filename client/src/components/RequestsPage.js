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
        button1={unsendInvite} />
    </div>
    
    
  </>
    )
}

export default Requests_Page;