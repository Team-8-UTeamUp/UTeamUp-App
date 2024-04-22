import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"

function NewUser() {
    const [inputs, setInputs] = useState({
        firstName:"",
        lastName:"",
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
            await axios.post("http://localhost:8800/api/register", inputs);
            navigate("/homepage");
        } catch (err) {
            console.log(err);
            // Check if err.response exists and has a data property
            if (err.response?.data) {
                setError(err.response.data);
            } else {
                setError("An error occurred, please try again later.");
            }
        }
    }

    return (
    <>
    <div class="login_body">
        <h3>Create your account</h3>
        <form action="">
            <label for="firstName" class="loginlabel">
                  First Name:
              </label>
            <input type="text"
                   id="firstName"
                   name="firstName"
                   class="logininput"
                   onChange={onChange}
                   placeholder="Enter your First Name" required>
            </input>
            <label for="lastName" class="loginlabel">
                  Last Name:
              </label>
            <input type="text"
                   id="lastName"
                   name="lastName"
                   class="logininput"
                   onChange={onChange}
                   placeholder="Enter your Last Name" required>
            </input>
            <label for="username" class="loginlabel">
                  Username:
              </label>
            <input type="text"
                   id="username"
                   name="username"
                   class="logininput"
                   onChange={onChange}
                   placeholder="Create your Username" required>
            </input>
            <label for="password" class="loginlabel">
                  Password:
              </label>
            <input type="password" 
                   id="password"
                   name="password"
                   class="logininput"
                   onChange={onChange}
                   placeholder="Create your Password" required>
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

export default NewUser;