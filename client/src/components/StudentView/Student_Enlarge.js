import React, { useState } from "react";
import axios from "axios"
import { AuthContext } from '../Login_Page/AuthContext';

const Student_Enlarge = ({
    id,
    name,
    skillset,
    languages,
    preferences,
    groupSz,
    bio,
    button2,
    profileView,
    Page,
    unsend
}) => {
    // Set projecct preferences
    const [preferencesRow, setPreferencesRow] = useState(preferences[0] || []);
    // Set message
    const [message, setMessage] = useState(null);
    const { studentId, setStudent } = React.useContext(AuthContext);


    React.useEffect(() => {
        const firstButton = document.querySelector(".togglebutton");
        if (firstButton) {
            firstButton.style.backgroundColor = "#baecd0";
            setPreferencesRow(preferences[0] || []); // Set the expanded profile to the first one
        }
    }, []); // Empty dependency array ensures this effect runs only once

    const teamUpClick = async (e) => {
        e.preventDefault()
        try {
            const paylaod = {
                debug: false, 
                receiverId: e.target.name, 
                senderId: studentId,
                receiverType: Page === "student" ? "ss" : "sg"
            }

            const res = await axios.post(`http://localhost:8800/api/teamUp/`, paylaod);
            console.log(res)

            //show success message
            setMessage('Your invitation has been sent!');
            // clear message
            setTimeout(() => {
                setMessage(null);
            }, 2000);


        } catch (err) {
            console.log(err);
            // show fail message
            setMessage('Invite already sent!');
            // clear message
            setTimeout(() => {
                setMessage(null);
            }, 2000);
        }
    }

    const rejectClick = async (e) => {
        e.preventDefault()
        try {
            const paylaod = {
                debug: false, 
                senderId: e.target.name, 
                receiverId: studentId,
                receiverType: Page === "student" ? "ss" : "sg"
            }
            const res = await axios.post(`http://localhost:8800/api/denyInvite/`, paylaod);
            console.log(res)

            //show success message
            setMessage('Invitation rejected.');
            // clear message
            setTimeout(() => {
                setMessage(null);
            }, 2000);

            window.location.reload();

        } catch (err) {
            console.log(err);
            
             // show fail message
             setMessage('Please try again!');
             // clear message
             setTimeout(() => {
                 setMessage(null);
             }, 2000);
        }
    }

    const unsendClick = async (e) => {
        e.preventDefault()
        try {
            const paylaod = {
                debug: false, 
                receiverId: e.target.name, 
                senderId: studentId,
                receiverType: Page === "student" ? "ss" : "sg"
            }

            const res = await axios.post(`http://localhost:8800/api/unsend/`, paylaod);
            console.log(res)

            //show success message
            setMessage('Your invitation has been unsent.');
            // clear message
            setTimeout(() => {
                setMessage(null);
            }, 2000);

            window.location.reload();
        } catch (err) {
            console.log(err);
             // show fail message
             setMessage('Please try again!');
             // clear message
             setTimeout(() => {
                 setMessage(null);
             }, 2000);
        }
    }

    const acceptClick = async (e) => {
        e.preventDefault()
        try {
            const paylaod = {
                debug: false, 
                senderId: e.target.name,
                receiverId: studentId,
                receiverType: Page === "student" ? "student" : "group"
            }

            const res = await axios.post(`http://localhost:8800/api/accept/`, paylaod);
            console.log(res)

              //show success message
              setMessage('You have accepted an invitation!');
              // clear message
              setTimeout(() => {
                  setMessage(null);
              }, 2000);

            window.location.reload();
        } catch (err) {
            console.log(err);
            // show fail message
            setMessage('Please try again!');
            // clear message
            setTimeout(() => {
                setMessage(null);
            }, 2000);
        }
    }

    function displayProjs(uid) {
        // This code will run after the DOM has fully loaded

        // Reset border color of all elements
        const elements = document.querySelectorAll(".togglebutton");
        elements.forEach((element) => {
            element.style.backgroundColor = "white";
        });

        // Find the clicked element and apply the border style
        var chosenButton = document.getElementById(uid);
        if (chosenButton) {
            chosenButton.style.backgroundColor = "#baecd0";

            if (uid == "CSP") setPreferencesRow(preferences[1] || []);
            else setPreferencesRow(preferences[0] || []);
        }
    }

    return (
        <div class="expanded" style={{ margin: "0px 0px 0px 60px" }}>
            
            <h2
                style={{
                    fontSize: "64px",
                    textAlign: "left",
                    color: "#157636",
                    marginBottom: "10px",
                }}
            >
                {name}
            </h2>
            <div className="skills-container">
                {skillset.map((skill, index) => (
                    <div class="skillbubble"> {skill} </div>
                ))}
            </div>
            <div className="languages-container">
                {languages.map((language, index) => (
                    <div class="langbubble"> {language} </div>
                ))}
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
                <div>
                    { !profileView && <button
                        class="teamupbutton"
                        name={id}
                        style={{ backgroundColor: unsend ? "gray" : "#FC8E28" }}
                        onClick={ button2 ? acceptClick : (unsend ? unsendClick : teamUpClick)}>
                        {button2 ? "Accept" : (unsend ? "Unsend" : "Team Up")}
                    </button> }
                </div>
                {button2 && <div><button class="teamupbutton" name={id} style={{backgroundColor: "red"}} onClick={rejectClick}>Reject</button></div>}
            </div>
            <h2 style={{ marginBottom: "20px" }}>Project Preferences</h2>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "30px",
                    justifyContent: "left",
                }}
            >
                <div class="preferences">
                    <div class="toggle">
                        <button
                            class="togglebutton"
                            id="UTDP"
                            style={{ borderRadius: "10px 0px 0px 0px" }}
                            onClick={() => displayProjs("UTDP")}
                        >
                            UTD Design
                        </button>
                        <button
                            class="togglebutton"
                            id="CSP"
                            style={{ borderRadius: "0px 10px 0px 0px" }}
                            onClick={() => displayProjs("CSP")}
                        >
                            CS Project
                        </button>
                    </div>
                    <div class="projlist">
                        {preferencesRow.map((preference, index) => (
                            <div key={index}>
                                {index + 1}) {preference}
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                    }}
                >
                    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems: "center", width:"200px"}}>
                        <div class="sizetile">{groupSz}</div>
                        <div
                            style={{
                                textAlign: "center",
                                fontSize: "12px",
                                fontWeight: "bold",
                                marginBottom: "20px",
                            }}
                        >
                            Preferred Group Size
                        </div>
                    </div>
                </div>
            </div>
            <h2 style={{ marginBottom: "20px" }}>About Me</h2>
            <div style={{ marginBottom: "40px" }}>{bio}</div>
            {message && <div className="popup">{message}</div>}
        </div>
    );
};

export default Student_Enlarge;
