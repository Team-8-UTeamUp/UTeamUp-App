import React from 'react'

function Header() {
    return (
        <header class="header">
            <img class="logo" src={require('../assets/logoTeam.png')} title="" alt=""></img>
            <h2 id="page_title" >Quiz</h2>
            {/* <p id="top_right">Save and Close</p> */}
            <button>Save and Close</button>
        </header>
    )
}

export default Header;