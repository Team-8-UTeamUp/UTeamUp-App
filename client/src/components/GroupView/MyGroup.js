
import React, { useState } from 'react';

const MyGroup= ({groupName, studentNames, skillset, languages, preferences, currGroupSz, prefGroupSz, bios, emails}) => {


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

    // bulk email button function
        const bulkClick = () => {
        // Join all email addresses with commas
        const recipients = emails.join(',');
        
        // Create a new email with recipient set to recipients
        window.location.href = `mailto:${recipients}`;
        };
    

    function sendEmail(singleEmail)
    {
        const recipients = singleEmail;
        // Create a new email with recipient set to recipients
        window.location.href = `mailto:${recipients}`;
    }


return(
    <div class="fullscreen">
        
        <div class="expanded" style={{ margin: "0px 40px 0px 40px"}}>   
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
                <div style={{display: "flex", flexDirection: "row", gap:"50px"}}>
                </div>
                <h1 style={{margintop:"40px", marginBottom: "20px"}}>Project Preferences</h1>
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
                <h1 style={{margintop:"20px", marginBottom: "20px"}}>About Us</h1>
                <div className='bio-list'>
                    {bios.map((bio, index) => (
                        <div>
                            <h2> {studentNames[index]}</h2> 
                            <div key={index} style={{marginBottom: "20px"}}>{bio}</div>
                        </div>
                    ))}
                </div> 

                {!isEditMode ? (
                    <div style={{display:"flex", flexDirection:"column", marginTop:"50px"}}>
                         <button class="teamupbutton" style={{marginBottom:"10px", color:"black", backgroundColor:"lightgray"}} onClick={toggleEditMode} id="editbutton" >Edit Profile</button>
                         <button class="teamupbutton"  style={{marginBottom:"10px", color:"white", backgroundColor:"black"}}>Close Group</button>
                         </div>
                    ) : (
                        <div style={{display:"flex", flexDirection:"column", marginTop:"50px"}}>
                        <div style={{display:"flex", flexDirection:"row", gap:"10px"}}>
                            <button  class="teamupbutton" style={{color:"black", backgroundColor:"lightgray"}} onClick={saveEdits} id="savebutton">Save</button>
                            <button class="teamupbutton" style={{color:"black", backgroundColor:"lightgray"}} onClick={cancelEdits} id="cancelbutton">Cancel</button>
                        </div>
                        <button class="teamupbutton" style={{margintop:"0px", color:"white", backgroundColor:"black"}}>Close Group</button>
                        </div>
                )}  
            </div>
            

            <div class="emails" style={{marginTop:"30px", border:"1px solid gray", borderRadius:"10px", width:"300px", height:"fit-content", display:"flex", flexDirection:"column", alignItems:"center", backgroundColor:"white", gap:"10px"}}>
            <div class="emailsHeadder" style={{backgroundColor:"lightgray", width:"inherit", height:"fit-content", paddingTop:"10px", paddingBottom:"10px", color:"black", textAlign:"center", borderRadius:"10px 10px 0px 0px"}}>Contact Information</div>
            {emails.map((email, index) => (
                        <button onClick={() => sendEmail(email)} class="email" style={{border:"1px solid gray",borderRadius:"10px", height:"fit-content", width:"fit-content", padding:"10px", color:"black", backgroundColor:"lightgray"}}> {email} </button>
            ))}

            <button onClick={bulkClick} style={{backgroundColor:"black", color:"white", padding:"10px", borderRadius:"10px", marginBottom:"20px"}}>Send Bulk Email</button>

            </div>

    </div>
   
        
)
   

 }

export default MyGroup;