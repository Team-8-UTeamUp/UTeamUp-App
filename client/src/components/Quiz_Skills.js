import React from 'react'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'

function Quiz_Skills() {
    return (
    <>
        <Header />
        <div class="centered">
            <p>What are some of your strengths?</p><br></br>
            <input id="text_box" type="text" placeholder="Create a new skill"></input>
        </div>
        <div class="button_layout">
            <button class="button">Database</button>
            <button class="button">AI</button>
            <button class="button">Machine Learning</button>
            <button class="button">Front-End</button>
            <button class="button">Back-End</button>
        </div>
        <Footer />
    </>
    )
}

export default Quiz_Skills;