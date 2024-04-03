import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Student from './student_view/Student';



function Home_Page() {
    
    return (
    <>
    <div class="row">
        <div class="column left">
        <img class="logo" src={require('../assets/logoTeam.png')} title="" alt=""></img>
            <h2>Column 1</h2>
            <div class="sidenav">
                <Link className="link" to="/"><p>TeamUp</p>
                </Link>
                <Link className="link" to="/"><p>Invitations</p>
                </Link>
                <Link className="link" to="/"><p>Requests</p>
                </Link>
                <Link className="link" to="/quiz"><p>Quiz</p>
                </Link>
                <Link className="link" to="/admin"><p>Admin</p>
                </Link>
                <Link className="link" to="/"><p>FAQ</p>
                </Link>
            </div>
        </div>
        <div class="column right">
            <h2>Column 2</h2>
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



