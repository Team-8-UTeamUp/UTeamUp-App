import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import ReturningUser from "./ReturningUser"
import NewUser from "./NewUser";

function Website_Login()
{
    return(
         <>
            <header class="header" style={{justifyContent:"center"}}>
            <img class="logo positionLogo" src={require('../../assets/logoTeam.png')} title="" alt=""></img>
            <h2 id="page_title">UTeamUp</h2>
            </header>

            <div style={{display:"flex", flexDirection:"row"}}>
                    <div class="split3" style={{backgroundColor:"#FC8E28"}}>
                        <h2 style={{paddingTop: "10%", paddingBottom: "5%", color:"white"}}>Welcome Back! Your team is waiting for you...</h2>
                        <ReturningUser/>
                        </div>
                    
                    <div class="split3" style={{backgroundColor:"green"}}>
                        <h2 style={{paddingTop: "10%", paddingBottom: "5%", color:"white"}}>New to UTeamUp? Lets get started..</h2>
                     <NewUser/>
                    </div>
                   
            </div>
        </>
    );
}

export default Website_Login;