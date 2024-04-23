import React, { useState } from 'react';
import Group_Tile from "./Group_Tile";
import Group_Enlarge from './Group_Enlarge';

function Group({button2, Profiles, Page, unsend})
{
    // in-depth look at profile 
    const expandedProfiles = Profiles.map(group=> (
        <Group_Enlarge
        //name, skillset, languages, preferences, groupSz, bio
            id={group.id}
            groupName={group.groupName}
            studentNames={group.studentNames}
            skillset={group.skills}
            languages={group.codingLanguages}
            preferences={group.preferences}
            currGroupSz={group.currentGroupSize}
            prefGroupSz={group.preferedGroupSize}
            bios={group.bio}
            Page={Page}
            unsend={unsend}
            button2={button2 ? button2 : null} 
        />
      ));

      // student tile information
      const studentTiles = Profiles.map(group => (
        //name, skills, languages, preferences, groupSz
        <Group_Tile 
            gid={group.id}
            groupName={group.groupName}
            studentNames={group.studentNames}
            skills={group.skills.slice(0,4)}
            languages={group.codingLanguages.slice(0,5)}
            preferences={group.preferences}
            currGroupSz={group.currentGroupSize}
            prefGroupSz={group.preferedGroupSize}
            onClick={() => displayInfo(group.id, group.index)} // Pass onClick handler to Student_Tile
        />
      ));

    const [expanded, setExpanded] =  useState(null);

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

export default Group;


