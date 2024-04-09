import React from 'react'
import NavBar from './NavBar';

function Profile_Page() {
    return (
    <>
    <div class="row">
        <div class="column left">
            <NavBar/>
        </div>
        <div class="column right">
            <h2>My Profile</h2>
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

export default Profile_Page;