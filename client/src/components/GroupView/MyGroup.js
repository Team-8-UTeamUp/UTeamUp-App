
import React, { useState } from 'react';

const MyGroup= ({groupName, studentNames, skillset, languages, preferences, currGroupSz, prefGroupSz, bios, button1, button2}) => {

    const [preferencesRow, setPreferencesRow] = useState(preferences[0] || []);

    // States to manage editable fields
    const [editableGroupName, setEditableGroupName] = useState(groupName);
    //const [editablePreferences, setEditablePreferences] = useState(preferences);
    const [editablePrefGroupSz, setEditablePrefGroupSz] = useState(prefGroupSz);

    // Handle change in preferences dynamically
    const handlePreferenceChange = (index, newValue) => {
        const updatedPreferences = [...editablePreferences];
        updatedPreferences[index] = newValue;
        setEditablePreferences(updatedPreferences);
    };

    React.useEffect(() => {
    const firstButton = document.querySelector('.togglebutton');
    if (firstButton) {
        firstButton.style.backgroundColor =  "#baecd0";
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
          chosenButton.style.backgroundColor=  "#baecd0";
          
          if(uid == "CSP")
            setPreferencesRow(preferences[1] || []);
          else
            setPreferencesRow(preferences[0] || []);
      }
}


return(

    <div class="expanded" style={{ margin: "0px 60px 0px 60px"}}>
        <input
                type="text"
                value={editableGroupName}
                onChange={(e) => setEditableGroupName(e.target.value)}
                style={{fontSize: "64px", textAlign: "left", color:"#157636", marginBottom:"10px"}}
        />
        <div className="names-container">
            <h3 style={{marginBottom:"20px"}}>{studentNames.join(", ")}</h3>
        </div>
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
        <div style={{display: "flex", flexDirection: "row", gap:"15px"}}>
            <div>{button1}</div>
            {button2 && <div>{button2}</div>}
        </div>
        <h2 style={{marginBottom: "20px"}}>Project Preferences</h2>
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
                <div class="sizetile" style ={{display:"flex", flexDirection:"row"}}>
                    {currGroupSz}/
                    <input
                        type="number"
                        value={editablePrefGroupSz}
                        onChange={(e) => setEditablePrefGroupSz(e.target.value)}
                    />
                </div>
                <div style={{textAlign: "center", fontSize:"12px", fontWeight:"bold", marginBottom: "20px"}}>Currrent Size/Prefered</div>  
            </div> 
        </div>
        <h2 style={{marginBottom: "20px"}}>About Us</h2>
        <div className='bio-list'>
            {bios.map((bio, index) => (
                <div>
                    <h3> {studentNames[index]}</h3> 
                    <div key={index} style={{marginBottom: "20px"}}>{bio}</div>
                </div>
            ))}
        </div>   
    </div>
   
        
)
   

}

export default MyGroup;