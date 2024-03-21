import React from 'react'
import Quiz_Skills from './components/Quiz_Skills.js';
import Faculty_Page from './components/Faculty_Page.js';

function App() {
  return (
    <div className="App">
      <head>
        <meta charset="UTF-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta http-equiv="X-UA-Compatible" content="ie=edge"></meta>
        <title>Quiz (Whole) </title>
      </head>

       {/* <Quiz_Skills />  */}
       <Faculty_Page />
    </div>
  );
}

export default App;
