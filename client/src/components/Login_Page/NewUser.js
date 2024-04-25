import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { AuthContext } from './AuthContext';

function NewUser() {
    const { studentId, setStudent } = useContext(AuthContext);

    const [inputs, setInputs] = useState({
        firstName:"",
        lastName:"",
        username: "",
        password: "pass",
    });

    const [isNewUser, setNU] = useState(false);
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
            setNU(true)
            setStudent(inputs.username)
            navigate("/quiz");
        } catch (err) {
            console.log(err);
            // Check if err.response exists and has a property
            if (err.response?.data) {
                const errorString = Object.keys(err.response.data)
                    .map(key => `${key}: ${err.response.data[key]}`)
                    .join(', ');
                setError(errorString);
            } else {
                setError("An error occurred, please try again later.");
            }
        }
    }
    

    return (
    <>
    <div className="login_body">
        <h3>Create your account</h3>
        <form action="">
            <label for="firstName" className="loginlabel">
                  First Name:
              </label>
            <input type="text"
                   id="firstName"
                   name="firstName"
                   className="logininput"
                   onChange={onChange}
                   placeholder="Enter your First Name" required>
            </input>
            <label for="lastName" className="loginlabel">
                  Last Name:
              </label>
            <input type="text"
                   id="lastName"
                   name="lastName"
                   className="logininput"
                   onChange={onChange}
                   placeholder="Enter your Last Name" required>
            </input>
            <label for="username" className="loginlabel">
                  Username:
              </label>
            <input type="text"
                   id="username"
                   name="username"
                   className="logininput"
                   onChange={onChange}
                   placeholder="Create your Username" required>
            </input>
            <label for="password" className="loginlabel">
                  Password:
              </label>
            <input type="password" 
                   id="password"
                   name="password"
                   className="logininput"
                   onChange={onChange}
                   placeholder="Create your Password" required>
            </input>
            <div className="wrap">
                <button type="submit" className="loginbutton"
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