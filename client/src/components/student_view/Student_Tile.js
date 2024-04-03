import { Flex, Text } from "@chakra-ui/react";
import React, {useState} from 'react';

const Student_Tile= ({name, skills, languages, preferences, groupSz, sid, bio, onClick}) => {
// Split preferences array into two rows

const [preferencesRow1, setPreferencesRow1] = useState(preferences[0] || []);
const [preferencesRow2, setPreferencesRow2] = useState(preferences[1] || []);



return(

    <button class="tile" id={sid} onClick={onClick}>
        <div className="Student_Tile">
        <h2 class="h2">{name}</h2>
        <div className="skills-container" >
            {skills.map((skill, index) => (
                 <div class="skillbubble"> {skill} </div>
            ))}
        </div>
        <div className="languages-container" >
            {languages.map((language, index) => (
                 <div class="langbubble"> {language} </div>
            ))}
        </div>
        <div className="dropdown-container">
            <p class="p">Project Preference:</p>
            <div class="dropdown">
                <button class="dropbtn">UTD Design Projects</button>
                    <div class="dropdown-content">
                    {preferencesRow1.map((preference, index) => (
                    <div key={index}>{index + 1} - {preference}</div>
                    ))}
                </div>
            </div>
            <div class="dropdown">
                <button class="dropbtn">CS Projects</button>
                    <div class="dropdown-content">
                    {preferencesRow2.map((preference, index) => (
                    <div key={index}>{index + 1} - {preference}</div>
                    ))}
                </div>
            </div>

        </div>
        
        <div class="sizetile">{groupSz}</div>
        
         </div>
    </button>
        
)
   

}

export default Student_Tile;