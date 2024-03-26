import {React, useState} from 'react'
import Header from './Header.js'
// import Footer from '../components/Footer.js'


function Quiz_Handler() {
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

            {showq1 ? <Question1 /> : null}
            {showq2 ? <Question2 /> : null}
            {showq3 ? <Question3 /> : null}
            {showq4 ? <Question4 /> : null}
            {showq5 ? <Question5 /> : null}
            {showq6 ? <Question6 /> : null}


        <footer class="footer">
            <button class="button_page" onClick={handlePrev}>Back</button>
            <button class="button_page" onClick={handleNext}>Continue</button>
        </footer>
    </>
    )
}

function Question1() { // Skills/Interests
    return (
        <>
            <div class="centered">
                <p>What are some of your strengths?</p><br></br>
            </div>
            <div class="button_layout">
                <button class="button">Database</button>
                <button class="button">AI</button>
                <button class="button">Machine Learning</button>
                <button class="button">Front-End</button>
                <button class="button">Back-End</button>
                <button class="button">Virtual Reality</button>
                <button class="button">Mobile Development</button>
                <button class="button">UI/UX</button>
            </div>
        </>
    )
}

function Question2() { // Languages
    return (
        <>
           <div class="centered">
                <p>What are some programming languages do you know?</p><br></br>
            </div>
            <div class="button_layout">
                <button class="button">Java</button>
                <button class="button">C++</button>
                <button class="button">Python</button>
                <button class="button">HTML</button>
                <button class="button">CSS</button>
                <button class="button">SQL</button>
                <button class="button">JavaScript</button>
                <button class="button">Nodejs</button>
            </div>
        </>
    )
}

function Question3() { // Project Preference: CS Project
    return (
        <>
            <div class="centered">
             <p>Rank your top 5 CS Projects</p><br></br> 
                          
            </div>
        </>
    )
}

function Question4() { // Project Preference: CS Project
    return (
        <>
            <div class="centered">
             <p>Rank your top 5 UTD Design Projects</p><br></br> 
                          
            </div>
        </>
    )
}

function Question5() { // About Me
    return (
        <>
            <div class="centered">
             <p>What is your ideal team size?</p><br></br> 
             <form name="myForm">
                Ideal Team Size: <input type="text" name="teamSize"/>
                <button class="button">Save</button>
            </form>                
            </div>
        </>
    )
}

function Question6() { // About Me
    return (
        <>
            <div class="centered">
             <p>Create Your bio. Tell potential teammates a little bit about yourself!</p><br></br> 
             <form name="myForm">
                <textarea name="paragraph_text" cols="90" rows="20"></textarea>
                <div><button class="button">Save</button></div>
            </form>                
            </div>
        </>
    )
}

export default Quiz_Handler;
