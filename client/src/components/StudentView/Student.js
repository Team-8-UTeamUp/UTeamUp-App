import React, { useState } from 'react';
import Student_Tile from "./Student_Tile";
import Student_Enlarge from './Student_Enlarge';

function Student({button2, Profiles, Page, unsend}) {
    const [expanded, setExpanded] = useState(null);

    // in-depth look at profile 
    const expandedProfiles = Profiles.map(student => (
        //name, skillset, languages, preferences, groupSz, bio
        <Student_Enlarge
            id={student.id}
            name={student.name}
            skillset={student.skills}
            languages={student.codingLanguages}
            preferences={student.preferences}
            groupSz={student.groupSizePreference}
            bio={student.bio}
            button2={button2 ? button2 : null} 
            Page={Page}
            unsend={unsend}
        />
    ));

    // student tile information
    const studentTiles = Profiles.map(student => (
        //name, skills, languages, preferences, groupSz
        <Student_Tile 
            sid={student.id}
            name={student.name}
            skills={student.skills.slice(0,4)}
            languages={student.codingLanguages.slice(0,5)}
            preferences={student.preferences}
            groupSz={student.groupSizePreference}
            onClick={() => displayInfo(student.id, student.index)} // Pass onClick handler to Student_Tile
        />
    ));

    function displayInfo(uid, ind) {
        // This code will run after the DOM has fully loaded
        // Reset border color of all elements
        const elements = document.querySelectorAll('.tile');
        elements.forEach(element => {
                element.classList.remove('selected');
        });

        // Find the clicked element and apply the border style
        var chosenTile = document.getElementById(uid);
        if (chosenTile) {
                chosenTile.classList.add("selected");
                setExpanded(expandedProfiles[ind]);
        }
    }

    // Set the initial orange border for the first tile
    React.useEffect(() => {
        const firstTile = document.querySelector('.tile');
        if (firstTile) {
            firstTile.classList.add("selected");
            setExpanded(expandedProfiles[0]); // Set the expanded profile to the first one
        }
    }, []); // Empty dependency array ensures this effect runs only once


    return(
        <div class="screen2"> 
            <div class="split1 screenleft">
                <div class="tilecentered"> 
                {studentTiles}
                </div>
            </div>
            <div class="split2 screenright">
                <div>
                {expanded}
                </div>
            </div>
        </div>
    );

}

export default Student;

