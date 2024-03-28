import React from 'react'
import { Link } from 'react-router-dom';

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
    <div class="body">
        <h2>Body</h2>
        <p>Some text..</p>
    </div>
    </>
    )
}

export default Home_Page;