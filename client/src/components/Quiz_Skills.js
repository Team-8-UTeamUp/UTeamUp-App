import React from 'react'
import Header from './Header.js'
import Footer from './Footer.js'

function Quiz_Skills() {
    return (
    <>
        <Header />
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
        <Footer />
    </>
    )
}

export default Quiz_Skills;