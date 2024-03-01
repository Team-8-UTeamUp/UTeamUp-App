import React from 'react'

function Header() {
    return (
        <header class="header" id="topPage">
            <img class="logo" src={require('../assets/logoTeam.png')} title="" alt=""></img>
            <h2>Quiz</h2>
            <p id="top_right">Save and Closed</p>
        </header>
    )
}

export default Header;