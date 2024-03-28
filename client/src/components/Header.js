import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header class="header">
            <img class="logo" src={require('../assets/logoTeam.png')} title="" alt=""></img>
            <h2 id="page_title" >Quiz</h2>
            {/* <p id="top_right">Save and Close</p> */}
            {/* <button>Save and Close</button> */}
            <Link className="link" to="/"><p>Return to Home</p></Link>
        </header>
    )
}

export default Header;