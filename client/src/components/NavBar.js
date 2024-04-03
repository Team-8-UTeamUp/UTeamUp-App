import React from 'react'
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <>
        <img class="logo" src={require('../assets/logoTeam.png')} title="" alt=""></img>
        <div class="sidenav">
            <Link className="active" id="link" to="/"><p>Home Page</p>
            </Link>
            <Link className="inactive" id="link" onclick="changeClass()" to="/invitations"><p>Invitations</p>
            </Link>
            <Link className="link" to="/requests"><p>Requests</p>
            </Link>
            <Link className="link" to="/quiz"><p>Quiz</p>
            </Link>
            <Link className="link" to="/admin"><p>Admin</p>
            </Link>
            <Link className="link" to="/faq"><p>FAQ</p>
            </Link>
        </div>
        <script>
        </script>
        </>
    )
}

function changeClass() {
    var element = document.querySelector("#link");
    element.classList.replace("inactive", "active");
}

export default NavBar;