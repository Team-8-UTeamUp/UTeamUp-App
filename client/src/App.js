import React from 'react'
import QuizPage from './components/QuizPage.js';
import FacultyPage from './components/FacultyPage.js';
import HomePage from './components/HomePage.js';
import InvitationsPage from './components/InvitationsPage.js';
import RequestsPage from './components/RequestsPage.js';
import FAQPage from './components/FAQPage.js';
import ProfilePage from './components/ProfilePage.js'
import LoginPage from './components/AdminLogin.js';
import Website_Login from './components/Login_Page/Website_Login.js';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div><Website_Login/></div>,
  },
  {
    path: "/homepage",
    element: <div><HomePage/></div>,
  },
  {
    path: "/profile",
    element: <div><ProfilePage/></div>,
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
  {
    path: "/login",
    element: <div><LoginPage/></div>,
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
