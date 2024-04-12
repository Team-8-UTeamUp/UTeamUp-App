import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"

function LoginPage() {
    const [inputs, setInputs] = useState({
        username: "",
        password: "pass",
    });

    const [err, setError] = useState(null);

    const navigate = useNavigate();

    const onChange = (e) => {
        setInputs((previous) => ({ 
            ...previous, 
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs)
        try {
            await axios.post("http://localhost:8800/api/login", inputs);
            navigate("/admin");
        } catch (err) {
            console.log(err)
            setError(err.response.data);
        }
    }

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
            <label for="first" class="loginlabel">
                  Username:
              </label>
            <input type="text"
                   id="first"
                   name="username"
                   class="logininput"
                   onChange={onChange}
                   placeholder="Enter your Username" required>
            </input>
            <label for="password" class="loginlabel">
                  Password:
              </label>
            <input type="password" 
                   id="password"
                   name="password"
                   class="logininput"
                   onChange={onChange}
                   placeholder="Enter your Password" required>
            </input>
            <div class="wrap">
                <button type="submit" class="loginbutton"
                        onClick={handleSubmit}>
                    Submit
                </button>
            </div>
            {err && <p>{err}</p>}
        </form>
    </div>
    </>
    )
}

export default LoginPage;