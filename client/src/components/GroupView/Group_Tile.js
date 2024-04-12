import React, {useState} from 'react';

const Group_Tile= ({groupName, studentNames, skills, languages, preferences, currGroupSz, prefGroupSz, gid, onClick}) => {
// Split preferences array into two rows

const [preferencesRow1, setPreferencesRow1] = useState(preferences[0] || []);
const [preferencesRow2, setPreferencesRow2] = useState(preferences[1] || []);


return(

    <button class="tile" id={gid} onClick={onClick} >
        <div className="Student_Tile">
        <img class="photo" src={require('../../assets/logoTeam.png')} ></img>
        <h2 class="h2">{groupName}</h2>
        <div style={{fontSize: "10px", position: "relative", left: "60px", marginBottom: "4px"}}>{studentNames.join(", ")}</div>
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
        
        <div class="sizetile">{currGroupSz}/{prefGroupSz}</div>
        
         </div>
    </button>
        
)
   

}

export default Group_Tile;