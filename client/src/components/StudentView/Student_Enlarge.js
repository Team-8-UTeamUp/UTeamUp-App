
import React, { useState } from 'react';

const Student_Enlarge= ({name, skillset, languages, preferences, groupSz, bio}) => {

    const [preferencesRow, setPreferencesRow] = useState(preferences[0] || []);

React.useEffect(() => {
    const firstButton = document.querySelector('.togglebutton');
    if (firstButton) {
        firstButton.style.backgroundColor = "green";
        setPreferencesRow(preferences[0] || []); // Set the expanded profile to the first one
    }
}, []) // Empty dependency array ensures this effect runs only once

function displayProjs(uid) {

  
    // This code will run after the DOM has fully loaded

      // Reset border color of all elements
      const elements = document.querySelectorAll('.togglebutton');
      elements.forEach(element => {
          element.style.backgroundColor = "white";

      });
  
      // Find the clicked element and apply the border style
      var chosenButton = document.getElementById(uid);
      if (chosenButton) {
          chosenButton.style.backgroundColor= "green";
          
          if(uid == "CSP")
            setPreferencesRow(preferences[1] || []);
          else
            setPreferencesRow(preferences[0] || []);
      }
}


return(

    <div class="expanded" style={{ margin: "0px 60px 0px 60px"}}>
       
        <h2 style={{fontSize: "64px", textAlign: "left", color:"#157636"}}>{name}</h2>
        <div className="skills-container" >
            {skillset.map((skill, index) => (
                 <div class="skillbubble"> {skill} </div>
            ))}
        </div>
        <div className="languages-container" >
            {languages.map((language, index) => (
                 <div class="langbubble"> {language} </div>
            ))}
        </div>
        <div class="teamupbutton">TeamUp</div>
        <h2 style={{marginBottom: "20px"}}>Project Preferences:</h2>
        <div style={{display: "flex", flexDirection: "row", gap: "30px", justifyContent: "center"}}>
            <div class="preferences">
                <div class="toggle">
                    <button class="togglebutton" id="UTDP" style={{borderRadius: "10px 0px 0px 0px"}} onClick={() => displayProjs("UTDP")}>UTD Design</button>
                    <button class="togglebutton" id="CSP" style={{borderRadius: "0px 10px 0px 0px"}} onClick={() => displayProjs("CSP")}>CS Project</button>
                </div>
                <div class="projlist">
                    {preferencesRow.map((preference, index) => (
                            <div key={index}>{index + 1}) {preference}</div>
                    ))}
                </div>
            </div>
            <div style={{display: "flex", flexDirection:"column", gap:"5px"}}>
                <div class="sizetile">{groupSz}</div>
                <div style={{textAlign: "center", fontSize:"12px", fontWeight:"bold", marginBottom: "20px"}}>Prefered Group Size</div>  
            </div> 
        </div>
        <h2 style={{marginBottom: "20px"}}>About Me</h2>
        <div style={{marginBottom: "20px"}}>{bio}</div>
      
    </div>
   
        
)
   

}

export default Student_Enlarge;