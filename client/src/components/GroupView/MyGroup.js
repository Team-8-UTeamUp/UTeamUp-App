
import React, { useState } from 'react';

const MyGroup= ({groupName, studentNames, skillset, languages, preferences, currGroupSz, prefGroupSz, bios}) => {


    // States to manage editable fields
    const [editableGroupName, setEditableGroupName] = useState(groupName);
    const [editableUTDesignPreferences, setUTDesignPreferences] = useState(preferences[0] || []);
    const [editableCSProjectPreferences, setCSProjectPreferences] = useState(preferences[1] || []);
    const [editablePrefGroupSz, setEditablePrefGroupSz] = useState(prefGroupSz);

    // Manage toggle between Project types
    const [IsUTDesign, setIsUTDesign] = useState(true);

    // Manage editablilty of page
    const [isEditMode, setIsEditMode] = useState(false);

    // Save previous values
    const [prevGroupName, setPrevGroupName] = useState(groupName);
    const [prevPrefGroupSz, setPrevPrefGroupSz] = useState(prefGroupSz);
    const [prevUTDPrefrences, setprevUTDPrefrences] = useState(editableUTDesignPreferences);
    const [prevCSPreferences, setprevCSPreferences] = useState(editableCSProjectPreferences);



    React.useEffect(() => {
    const firstButton = document.querySelector('.togglebutton');
    if (firstButton) {
        firstButton.style.backgroundColor =  "#baecd0";
        setIsUTDesign(true); // set project preferece to view UTD Design tab
    }
}, []) 

function displayProjs(uid) {

      // Reset border color of all elements
      const elements = document.querySelectorAll('.togglebutton');
      elements.forEach(element => {
          element.style.backgroundColor = "white";

      });
  
      // Find the clicked element and apply the border style
      var chosenButton = document.getElementById(uid);
      if (chosenButton) {
          chosenButton.style.backgroundColor=  "#baecd0";
          
          const choice = uid === "CSP" ? false: true;

          setIsUTDesign(choice); 
      }
}

// update preferences when edited
const handleCSPreferenceChange = (index, newValue) => {
    const updatedPreferences = [...editableCSProjectPreferences];
    updatedPreferences[index] = newValue;
    setCSProjectPreferences(updatedPreferences);
};

// update preferences when edited
const handleUTDPreferenceChange = (index, newValue) => {
    const updatedPreferences = [...editableUTDesignPreferences];
    updatedPreferences[index] = newValue;
    setUTDesignPreferences(updatedPreferences);
};

const toggleEditMode = () => {
    setIsEditMode(!isEditMode); // Toggle the edit mode
};

function saveEdits()
{
    
    setPrevGroupName(editableGroupName);
    setPrevPrefGroupSz(editablePrefGroupSz);
    setprevUTDPrefrences(editableUTDesignPreferences);
    setprevCSPreferences(editableCSProjectPreferences);
    setIsEditMode(false); // Exit edit mode
    
}

function cancelEdits()
{
    // Revert changes by resetting to initial props
    setEditableGroupName(prevGroupName);
    setEditablePrefGroupSz(prevPrefGroupSz);
    setUTDesignPreferences(prevUTDPrefrences);
    setCSProjectPreferences(prevCSPreferences);
    setIsEditMode(false); // Exit edit mode
}


return(

    <div class="expanded" style={{ margin: "0px 60px 0px 60px"}}>
        {!isEditMode ? (
                <button onClick={toggleEditMode} id="editbutton">Edit Page</button>
            ) : (
                <div style={{display:"flex", flexDirection:"row"}}>
                     <button onClick={saveEdits} id="savebutton">Save</button>
                     <button onClick={cancelEdits} id="cancelbutton">Cancel</button>
                </div>
        )}
            
        
        {isEditMode ? (
                <input
                    type="text"
                    value={editableGroupName}
                    onChange={(e) => 
                        {
                            setEditableGroupName(e.target.value)    
                        }
                    }

                    style={{fontSize: "64px", textAlign: "left", color:"#157636", marginBottom:"10px"}}
                />
            ) : (
                <h1 style={{fontSize: "64px", textAlign: "left", color:"#157636", marginBottom:"10px"}}>{editableGroupName}</h1>
        )}
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
        </div>
        <h2 style={{marginBottom: "20px"}}>Project Preferences</h2>
        <div style={{display: "flex", flexDirection: "row", gap: "30px", justifyContent: "center"}}>
            <div class="preferences">
                <div class="toggle">
                    <button class="togglebutton" id="UTDP" style={{borderRadius: "10px 0px 0px 0px"}} onClick={() => displayProjs("UTDP")}>UTD Design</button>
                    <button class="togglebutton" id="CSP" style={{borderRadius: "0px 10px 0px 0px"}} onClick={() => displayProjs("CSP")}>CS Project</button>
                </div>
                <div class="projlist">
                    {isEditMode ? (
                        
                        IsUTDesign ? (
                        
                            editableUTDesignPreferences.map((preference, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={preference}
                                    onChange={(e) => handleUTDPreferenceChange(index, e.target.value)}
                                    style={{margin: "5px"}}
                                />
                            ))
                        ) : (
                            
                            editableCSProjectPreferences.map((preference, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={preference}
                                    onChange={(e) => handleCSPreferenceChange(index, e.target.value)}
                                    style={{margin: "5px"}}
                                />
                            ))
                        )

                    ) : (

                        IsUTDesign ? (
                        
                            editableUTDesignPreferences.map((preference, index) => (
                                <div key={index}>{index + 1}) {preference}</div>
                            ))
                        ) : (
                            
                            editableCSProjectPreferences.map((preference, index) => (
                                <div key={index}>{index + 1}) {preference}</div>
                            ))
                        )
                    )}
                </div>
            </div>
            <div style={{display: "flex", flexDirection:"column", gap:"5px"}}>
                <div class="sizetile" style ={{display:"flex", flexDirection:"row"}}>
                    {currGroupSz}/
                    {isEditMode ? (
                        <input
                            type="number"
                            value={editablePrefGroupSz}
                            onChange={(e) => setEditablePrefGroupSz(e.target.value)}
                            style={{fontSize: "50px", color:"#157636", width:"45px"}}
                        />
                    ) : (
                        <div>{editablePrefGroupSz}</div>
                    )}
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