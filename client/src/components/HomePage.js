import { Link } from 'react-router-dom';
import {React, useState} from 'react'
import Student from './StudentView/Student';
import NavBar from './NavBar';
import FilterBar from './FilterBar';



function Home_Page() {
    return (
    <>
    <div class="row">
        <div class="column left">
          <NavBar/>
        </div>
        <div class="column right">
            <h2>Home</h2>
            <div style={{display: "flex", flexDirection: "row", gap:"200px", justifyContent:"center", marginTop:"20px"}}>
                <button class="pageswitchbutton" style={{margin:"0px"}}>Student Profiles</button>
                <button class="pageswitchbutton" style={{margin:"0px"}}>Group Profiles</button>
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

export default Home_Page;



