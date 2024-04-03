import React from 'react'
import QuizPage from './components/QuizPage.js';
import FacultyPage from './components/FacultyPage.js';
import HomePage from './components/HomePage.js';
import InvitationsPage from './components/InvitationsPage.js';
import RequestsPage from './components/RequestsPage.js';
import FAQPage from './components/FAQPage.js';
/*import theme from './components/Project_Preferences/theme.js';*/
import { ChakraProvider } from "@chakra-ui/react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div><HomePage/></div>,
  },
  {
    path: "/invitations",
    element: <div><InvitationsPage/></div>,
  },
  {
    path: "/requests",
    element: <div><RequestsPage/></div>,
  },
  {
    path: "/quiz",
    element: <div><QuizPage/></div>,
  },
  {
    path: "/admin",
    element: <div><FacultyPage/></div>,
  },
  {
    path: "/faq",
    element: <div><FAQPage/></div>,
  },
]);

function App() {
  return (
    <div className="App">
      <head>
        <meta charset="UTF-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta http-equiv="X-UA-Compatible" content="ie=edge"></meta>
        <title>UTeamUp</title>
      </head>

        <div className="container">
        {/*<ChakraProvider theme={theme}>*/}
        <RouterProvider router={router}/>
        {/* </ChakraProvider> */}
        </div>
       {/* <Quiz_Skills />  */}
       {/* <Home_Page /> */}
       {/* <Faculty_Page /> */}
    </div>
  );
}

export default App;
