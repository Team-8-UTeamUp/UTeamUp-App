import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"

function ReturningUser() {
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
        try {
            await axios.post("http://localhost:8800/api/login", inputs);
            navigate("/homepage");
        } catch (err) {
            console.log(err)
            setError(err.response.data);
        }
    }

    return (
    <>
   
    <div class="login_body">
        <h3>Log in</h3>
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
                    Log In
                </button>
            </div>
            {err && <p>{err}</p>}
        </form>
    </div>
    </>
    )
}

export default ReturningUser;