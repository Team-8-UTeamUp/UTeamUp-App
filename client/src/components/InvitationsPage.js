import { Link } from 'react-router-dom';
import {React, useState} from 'react'
import Student from './StudentView/Student';
import NavBar from './NavBar';
import FilterBar from './FilterBar';



function Invitations_Page() {
    return (
    <>
    <div class="row">
        <div class="column left">
          <NavBar/>
        </div>
        <div class="column right">
            <h2>Invitations Recieved</h2>
            <div style={{display: "flex", flexDirection: "row", gap:"200px", justifyContent:"center", marginTop:"20px"}}>
                <button class="pageswitchbutton" style={{margin:"0px"}}>Student Invitations</button>
                <button class="pageswitchbutton" style={{margin:"0px"}}>Student Group Invitations</button>
            </div>
        </div>
    </div>
    
    
    <div class="screen">
      <FilterBar/>
      <Student/>
    </div>
    
    
  </>
    )
}

export default Invitations_Page;