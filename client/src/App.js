import React from 'react'
import Quiz_Skills from './components/Quiz_Skills.js';
import Quiz_Page from './components/Quiz_Page.js';
import Faculty_Page from './components/Faculty_Page.js';
import Home_Page from './components/Home_Page.js';
import theme from './components/ProjectPreferences/theme.js';
import { ChakraProvider } from "@chakra-ui/react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div><Home_Page/></div>,
  },
  {
    path: "/quiz",
    element: <div><Quiz_Page/></div>,
  },
  {
    path: "/admin",
    element: <div><Faculty_Page/></div>,
  },
]);

function App() {
  return (
    <div className="App">
      <head>
        <meta charset="UTF-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta http-equiv="X-UA-Compatible" content="ie=edge"></meta>
        <title>Quiz (Whole) </title>
      </head>

        <div className="container">
        <ChakraProvider theme={theme}>
        <RouterProvider router={router}/>
        </ChakraProvider>
        </div>
       {/* <Quiz_Skills />  */}
       {/* <Home_Page /> */}
       {/* <Faculty_Page /> */}
    </div>
  );
}

export default App;
