import React from 'react'

function Home_Page() {
    return (
    <>
    <div class="row">
        <div class="column left">
        <img class="logo" src={require('../assets/logoTeam.png')} title="" alt=""></img>
            <h2>Column 1</h2>
            <div class="sidenav">
                <a href="#">TeamUp</a> <br></br>
                <a href="#">Invitations</a> <br></br>
                <a href="#">Requests</a> <br></br>
                <a href="#">Quiz</a> <br></br>
                <a href="#">Admin</a> <br></br>
                <a href="#">FAQ</a> <br></br>
            </div>
        </div>
        <div class="column right">
            <h2>Column 2</h2>
            <p>Some text..</p>
        </div>
    </div>
    <div class="body">
        <h2>Body</h2>
        <p>Some text..</p>
    </div>
    </>
    )
}

export default Home_Page;