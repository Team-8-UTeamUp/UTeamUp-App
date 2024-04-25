import React, {useState} from 'react'
import Header from './Header.js'
import axios from "axios"
import Preference from "./Project_Preferences/Preference.js"
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './Login_Page/AuthContext';


function Quiz_Handler() {
    const navigate = useNavigate();
    const { studentId, setStudent } = React.useContext(AuthContext);

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
            else {
                navigate("/homepage");
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
            console.log(active)
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


function Question3({ studentId }) {
    const [CSProjects, setCSProjects] = useState([]);
    const[projLoading, setProjLoading] = useState(true);

    
    React.useEffect(() => {
        const FetchProjects =  async () => {
            try {
              const res = await axios.get(`http://localhost:8800/api/csprojects`);
                setCSProjects(res.data);
                setProjLoading(false);
              
            } catch (err) {
              console.log(err);
            }
          }
          FetchProjects();
    }, []);

    if (projLoading) {
        return <Question3_Render projLoading={true}/>;
      }

      return (
        <Question3_Render CSProjects={CSProjects} projLoading={false} studentId={studentId}/>
      )
    }

function Question3_Render({CSProjects, projLoading, studentId}) {
if (projLoading) {
    return(
        <>
         <h2>Loading...</h2>
        </>
    )
}

const [rankings, setRankings] = useState(Array(5).fill(null));

const handleRankChange = (index, value) => {
    const updatedRankings = [...rankings];
    updatedRankings[index] = value;
    setRankings(updatedRankings);
};

const handleSave = async () => {
    try {
    console.log(rankings)
    const res = await axios.post("http://localhost:8800/api/quiz/q3-4", {
        studentId: studentId,
        rankings: rankings,
        projType:"csprojects"
    });
    console.log(res);
} catch (err) {
      console.log(err);
    }
};

  return (
    <>
      <div className="centered">
        <p>
          Rank your top 5 CS Projects{" "}
          <button className="button" onClick={handleSave}>
            Save
          </button>
        </p>
        <br />
        <Preference projects={CSProjects} onRankChange={handleRankChange} />
      </div>
    </>
  );
}


function Question4({ studentId }) {
    const [UTDProjects, setUTDProjects] = useState([]);
    const[projLoading, setProjLoading] = useState(true);

    
    React.useEffect(() => {
        const FetchProjects =  async () => {
            try {
              const res = await axios.get(`http://localhost:8800/api/utdprojects`);
                setUTDProjects(res.data);
                setProjLoading(false);
              
            } catch (err) {
              console.log(err);
            }
          }
          FetchProjects();
    }, []);

    if (projLoading) {
        return <Question4_Render projLoading={true}/>;
      }

      return (
        <Question4_Render UTDProjects={UTDProjects} projLoading={false} studentId={studentId}/>
      )
    }

function Question4_Render({UTDProjects, projLoading, studentId}) {
if (projLoading) {
    return(
        <>
         <h2>Loading...</h2>
        </>
    )
}

    const [rankings, setRankings] = useState(Array(5).fill(null));

    const handleRankChange = (index, value) => {
        const updatedRankings = [...rankings];
        updatedRankings[index] = value;
        setRankings(updatedRankings);
    };

    const handleSave = async () => {
        try {
        console.log(rankings)
        const res = await axios.post("http://localhost:8800/api/quiz/q3-4", {
            studentId: studentId,
            rankings: rankings,
            projType:"utdprojects"
        });
        console.log(res);
    } catch (err) {
          console.log(err);
        }
    };


  return (
    <>
      <div className="centered">
        <p>
          Rank your top 5 UTD Projects{" "}
          <button className="button" onClick={handleSave}>
            Save
          </button>
        </p>
        <br />
        <Preference projects={UTDProjects} onRankChange={handleRankChange} />
      </div>
    </>
  );
}


function Question5({studentId}) { // About Me

    const [teamSize, setSize] = useState("");

    const handleChange = (event) => {
        const value = event.target.value;
        setSize(value);
    };
    const handleSumbit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:8800/api/quiz/q5", {studentId: studentId, teamSize:teamSize})
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div class="centered">
                <p>What is your ideal team size?</p><br></br> 
                <form name="myForm">
                    Ideal Team Size: 
                    <input type="text" name="teamSize" onChange={handleChange} value={teamSize}/>
                    <button class="button" onClick={handleSumbit}>Save</button>
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
    const handleSumbit = async (e) => {
        e.preventDefault()
        try {
            console.log(studentId)
            console.log(bio)
            const res = await axios.post("http://localhost:8800/api/quiz/q6", {studentId: studentId, bio:bio})
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div class="centered">
                <p>Create Your bio. Tell potential teammates a little bit about yourself!</p><br></br> 
                <form name="myForm">
                    <textarea name="paragraph_text" cols="90" rows="20" onChange={handleChange} value={bio}></textarea>
                    <div><button class="button" onClick={handleSumbit}>Save</button></div>
            </form>                
            </div>
        </>
    )
}

export default Quiz_Handler;


