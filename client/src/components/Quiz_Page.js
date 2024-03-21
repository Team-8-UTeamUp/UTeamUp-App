import {React, useState} from 'react'
import Header from './Header.js'
// import Footer from '../components/Footer.js'

function Quiz_Handler() {
    const [showq1, setShow1] = useState(true);
    const [showq2, setShow2] = useState(false);
    const [showq3, setShow3] = useState(false);

    const [currQuestion, setCurr] = useState(0);

    const questions = 3;

    function handleNext() {
        if (currQuestion <= questions-1) {
            setCurr(currQuestion + 1)

            if (currQuestion === 0) {
                setShow1(false)
                setShow2(true)
            } else if (currQuestion === 1) {
                setShow2(false)
                setShow3(true)
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
            }
        }
    }

    return (
    <>
        <Header />

            {showq1 ? <Question1 /> : null}
            {showq2 ? <Question2 /> : null}
            {showq3 ? <Question3 /> : null}


        <footer class="footer">
            <button class="button_page" onClick={handlePrev}>Back</button>
            <button class="button_page" onClick={handleNext}>Continue</button>
        </footer>
    </>
    )
}

function Question1() {
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
            </div>
        </>
    )
}

function Question2() {
    return (
        <>
            <div class="centered">
                <h1>Question 2</h1>
            </div>
        </>
    )
}

function Question3() {
    return (
        <>
            <div class="centered">
                <h1>Question 3</h1>
            </div>
        </>
    )
}

export default Quiz_Handler;