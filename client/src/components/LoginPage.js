import React from 'react'
import { Link } from 'react-router-dom';

function LoginPage() {
    return (
    <>
    <header class="header">
        <img class="logo" src={require('../assets/logoTeam.png')} title="" alt=""></img>
            <h2 id="page_title" >Login</h2>
            <Link className="link" to="/"><p>Return to Home</p></Link>
        </header>
    <div class="login_body">
        <h3>Enter your login credentials</h3>
        <form action="">
            <label for="first">
                  Username:
              </label>
            <input type="text"
                   id="first"
                   name="first"
                   placeholder="Enter your Username" required>
            </input>
            <label for="password">
                  Password:
              </label>
            <input type="password"
                   id="password"
                   name="password"
                   placeholder="Enter your Password" required>
            </input>
            <div class="wrap">
                <button type="submit"
                        onclick="solve()">
                    Submit
                </button>
            </div>
        </form>
    </div>
    </>
    )
}

export default LoginPage;