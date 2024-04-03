import React from 'react'
import NavBar from './NavBar';

function FAQ_Page() {
    return (
    <>
    <div class="row">
        <div class="column left">
            <NavBar/>
        </div>
        <div class="column right">
            <h2>FAQ</h2>
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

export default FAQ_Page;