import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"

function NewUser() {
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
            await axios.post("http://localhost:8800/api/admin/login", inputs);
            navigate("/admin");
        } catch (err) {
            console.log(err)
            setError(err.response.data);
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
                   name="First Name"
                   class="logininput"
                   onChange={onChange}
                   placeholder="Enter your First Name" required>
            </input>
            <label for="LastName" class="loginlabel">
                  Last Name:
              </label>
            <input type="text"
                   id="firstName"
                   name="First Name"
                   class="logininput"
                   onChange={onChange}
                   placeholder="Enter your First Name" required>
            </input>
            <label for="ID" class="loginlabel">
                  Username:
              </label>
            <input type="text"
                   id="ID"
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