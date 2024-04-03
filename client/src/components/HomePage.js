import { Link } from 'react-router-dom';
import {React, useState} from 'react'
import Student from './StudentView/Student';
import NavBar from './NavBar';



function Home_Page() {
    return (
    <>
    <div class="row">
        <div class="column left">
          <NavBar/>
        </div>
        <div class="column right">
            <h2>Home</h2>
            <p>Some text..</p>
        </div>
    </div>
    
    
    <div class="screen">
      <div class="filerbar">
        <button class="button">Group Size</button>
        <button class="button">Project Preference</button>
        <button class="button">Skills</button>
        <form>
                <input class="outline" type="text" name="search"/>
                <button class="button">search</button>
        </form>                
      </div>
      <Student/>
    </div>
    
    
  </>
    )
}

export default Home_Page;



