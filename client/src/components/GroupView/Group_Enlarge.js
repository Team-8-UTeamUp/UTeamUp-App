import React, { useState } from "react";
import axios from "axios"

const Group_Enlarge = ({
    id,
    groupName,
    studentNames,
    skillset,
    languages,
    preferences,
    currGroupSz,
    prefGroupSz,
    bios,
    button2,
    Page,
    unsend
}) => {
    const [preferencesRow, setPreferencesRow] = useState(preferences[0] || []);
    // Set message
    const [message, setMessage] = useState(null);

    const teamUpClick = async (e) => {
        e.preventDefault()
        try {
            const paylaod = {
                debug: true, 
                receiverId: e.target.name, 
                receiverType: "sg"
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
                debug: true, 
                senderId: e.target.name, 
                receiverType: "gs"
            }

            const res = await axios.post(`http://localhost:8800/api/denyInvite/`, paylaod);
            console.log(res)
            //show success message
            setMessage('Invitation rejected.');
            // clear message
            setTimeout(() => {
                setMessage(null);
            }, 2000);
            
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
                debug: true, 
                receiverId: e.target.name, 
                receiverType: "sg"
            }

            const res = await axios.post(`http://localhost:8800/api/unsend/`, paylaod);
            console.log(res)

            //show success message
            setMessage('Your invitation has been unsent.');
            // clear message
            setTimeout(() => {
                setMessage(null);
            }, 2000);

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
                debug: true, 
                senderId: e.target.name,
                receiverType: "group"
            }

            const res = await axios.post(`http://localhost:8800/api/accept/`, paylaod);
            console.log(res)

            //show success message
            setMessage('You have accepted an invitation!');
            // clear message
            setTimeout(() => {
                setMessage(null);
            }, 2000);

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

    React.useEffect(() => {
        const firstButton = document.querySelector(".togglebutton");
        if (firstButton) {
            firstButton.style.backgroundColor = "#baecd0";
            setPreferencesRow(preferences[0] || []); // Set the expanded profile to the first one
        }
    }, []); // Empty dependency array ensures this effect runs only once

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
        <div class="expanded" style={{ margin: "0px 60px 0px 60px" }}>
            <h2
                style={{
                    fontSize: "64px",
                    textAlign: "left",
                    color: "#157636",
                    marginBottom: "10px",
                }}
            >
                {groupName}
            </h2>
            <div className="names-container">
                <h3 style={{ marginBottom: "20px" }}>
                    {studentNames.join(", ")}
                </h3>
            </div>
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
                    <button
                        class="teamupbutton"
                        name={id}
                        style={{ backgroundColor: unsend ? "gray" : "#FC8E28" }}
                        onClick={ button2 ? acceptClick : (unsend ? unsendClick : teamUpClick)}>
                        {button2 ? "Accept" : (unsend ? "Unsend" : "Team Up")}
                    </button>
                </div>
                {message && <div className="popup">{message}</div>}
                {button2 && 
                <button 
                    style={{backgroundColor:"red"}}
                    class="teamupbutton"
                    name={id}
                    onClick={rejectClick}>
                    Reject
                </button>}
            </div>
            <h2 style={{ marginBottom: "20px" }}>Project Preferences</h2>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "30px",
                    justifyContent: "center",
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
                    <div class="sizetile">
                        {currGroupSz}/{prefGroupSz}
                    </div>
                    <div
                        style={{
                            textAlign: "center",
                            fontSize: "12px",
                            fontWeight: "bold",
                            marginBottom: "20px",
                            textWrap:"nowrap"
                        }}
                    >
                        Currrent Size/Preferred
                    </div>
                </div>
                </div>
            </div>
            <h2 style={{ marginBottom: "20px" }}>About Us</h2>
            <div className="bio-list">
                {bios.map((bio, index) => (
                    <div>
                        <h3> {studentNames[index]}</h3>
                        <div key={index} style={{ marginBottom: "20px" }}>
                            {bio}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Group_Enlarge;
