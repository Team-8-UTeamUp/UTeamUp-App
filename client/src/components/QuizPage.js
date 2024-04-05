import {React, useState} from 'react'
import Header from './Header.js'
import axios from "axios"


function Quiz_Handler() {

    

    const studentId = "ABC120012"

    const [showq1, setShow1] = useState(true);
    const [showq2, setShow2] = useState(false);
    const [showq3, setShow3] = useState(false);
    const [showq4, setShow4] = useState(false);
    const [showq5, setShow5] = useState(false);
    const [showq6, setShow6] = useState(false);

    const [currQuestion, setCurr] = useState(0);

    const questions = 6;

    function handleNext() {
        if (currQuestion <= questions-1) {
            setCurr(currQuestion + 1)

            if (currQuestion === 0) {
                setShow1(false)
                setShow2(true)
            } else if (currQuestion === 1) {
                setShow2(false)
                setShow3(true)
            } else if (currQuestion === 2) {
                setShow3(false)
                setShow4(true)
            }  else if (currQuestion === 3) {
                setShow4(false)
                setShow5(true)
            }  else if (currQuestion === 4) {
                setShow5(false)
                setShow6(true)
            }
        }
    }

    function handlePrev() {
        if (currQuestion > 0) {
            setCurr(currQuestion - 1)

            if (currQuestion === 1) {
                setShow1(true)
                setShow2(false)
            } else if (currQuestion === 2) {
                setShow2(true)
                setShow3(false)
            } else if (currQuestion === 3) {
                setShow3(true)
                setShow4(false)
            } else if (currQuestion === 4) {
                setShow4(true)
                setShow5(false)
            } else if (currQuestion === 5) {
                setShow5(true)
                setShow6(false)
            } 
        }
    }

    return (
    <>
        <Header />

            {showq1 ? <Question1 studentId={studentId}/> : null}
            {showq2 ? <Question2 studentId={studentId}/> : null}
            {showq3 ? <Question3 studentId={studentId}/> : null}
            {showq4 ? <Question4 studentId={studentId}/> : null}
            {showq5 ? <Question5 studentId={studentId}/> : null}
            {showq6 ? <Question6 studentId={studentId}/> : null}


        <footer class="footer">
            <button class={ showq1 ? 'button_disabled' : 'button_page' } disabled={showq1} onClick={handlePrev}>Back</button>
            <button class='button_page' onClick={handleNext}>{ !showq6 ? "Continue" : "Exit" }</button>
        </footer>
    </>
    )
}

function Question1({studentId}) { // Skills/Interests

    const [active, setActive] = useState([])
    const options = ["Database", "AI", "Machine Learning", "Front-End", "Back-End", "Virtual Reality", "Mobile Development", "UI/UX"]

    const handleSumbit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:8800/api/quiz/q1", {studentId: studentId, skills: active})
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div class="centered">
                <p>What are some of your strengths? <button class="button" onClick={handleSumbit}>Save</button></p>
                <br></br>
            </div>
            <div class="button_layout">
                {
                    options.map(key => {
                        const isActive = active.includes(key)

                        return (
                            <button
                                onClick={() => setActive(isActive
                                    ? active.filter(current => current !== key)
                                    : [...active, key]
                                )}
                                style={{ 'background-color': isActive ? '#157636' : '#FC8E28' }}
                                class="button">{key}</button>
                        )
                    })
                }
            </div>
        </>
    )
}

function Question2({studentId}) { // Languages

    const [active, setActive] = useState([])
    const options = ["Java", "C++", "Python", "HTML", "CSS", "SQL", "JavaScript", "Nodejs"]

    const handleSumbit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:8800/api/quiz/q2", {studentId: studentId, languages: active})
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div class="centered">
                <p>What are some programming languages do you know? <button class="button" onClick={handleSumbit}>Save</button></p>
                <br></br>
            </div>
            <div class="button_layout">
                {
                    options.map(key => {
                        const isActive = active.includes(key)

                        return (
                            <button
                                onClick={() => setActive(isActive
                                    ? active.filter(current => current !== key)
                                    : [...active, key]
                                )}
                                style={{ 'background-color': isActive ? '#157636' : '#FC8E28' }}
                                class="button">{key}</button>
                        )
                    })
                }
            </div>
        </>
    )
}

function Question3({studentId}) { // Project Preference: CS Project
    return (
        <>
            <div class="centered">
                <p>Rank your top 5 CS Projects</p><br></br> 
                <Preference
                 projects={CSProjects}/>

            </div>
        </>
    )
}

function Question4({studentId}) { // Project Preference: CS Project
    
    return (
        <>
            <div class="centered"> 
                <p>Rank your top 5 UTD Design Projects</p><br></br>
                <Preference
                projects={UDProjects}/>
            </div>
        </>
    )
}

function Question5({studentId}) { // About Me

    const [teamSize, setSize] = useState("");

    const handleChange = (event) => {
        const value = event.target.value;
        setSize(value);
    };

    return (
        <>
            <div class="centered">
                <p>What is your ideal team size?</p><br></br> 
                <form name="myForm">
                    Ideal Team Size: 
                    <input type="text" name="teamSize" onChange={handleChange} value={teamSize}/>
                    <button class="button">Save</button>
                </form>                
            </div>
        </>
    )
}

function Question6({studentId}) { // About Me

    const [bio, setBio] = useState("");

    const handleChange = (event) => {
        const value = event.target.value;
        setBio(value);
    };

    return (
        <>
            <div class="centered">
                <p>Create Your bio. Tell potential teammates a little bit about yourself!</p><br></br> 
                <form name="myForm">
                    <textarea name="paragraph_text" cols="90" rows="20" onChange={handleChange} value={bio}></textarea>
                    <div><button class="button">Save</button></div>
            </form>                
            </div>
        </>
    )
}

export default Quiz_Handler;


// load projects

//UTD Design Projects
const UDProjects = [ // single student profiles
  {
    number:1,
    company:"Amandus",
    title:"VR Game for Lupus Patients - with AHT Team",
    maxTeams: 1
  },
 
  {
    number: 2,
    company: "Athlete Reserve",
    title:	"Athlete Reserve App - Phase 2",
    maxTeams:1
  },

{
    number: 3,
    maxTeams:2,
    company: "CataBoom Technologies",
    title:	"AI assisted data exploration of complex data"
},

{
    number: 4,
    maxTeams: 1,
    company:"Ellison Fluid Calipers",
    title: "Full-stack Development of Ellison Fluid Caliper’s Calculation Webapp",
},

]


//UTD Design Projects
const CSProjects = [ // single student profiles
  {
    number:1,
    company:"Amandus",
    title:"VR Game for Lupus Patients - with AHT Team",
    maxTeams: 1
  },
 
  {
    number: 2,
    company: "Athlete Reserve",
    title:	"Athlete Reserve App - Phase 2",
    maxTeams:1
  },

{
    number: 3,
    maxTeams:2,
    company: "CataBoom Technologies",
    title:	"AI assisted data exploration of complex data"
},

{
    number: 4,
    maxTeams: 1,
    company:"Ellison Fluid Calipers",
    title: "Full-stack Development of Ellison Fluid Caliper’s Calculation Webapp",
},

]


