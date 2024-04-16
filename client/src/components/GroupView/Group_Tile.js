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
        <div className="skills-container" >
            {skills.slice(0, 5).map((skill, index) => (
                    <div key={index} class="skillbubble"> {skill} </div>
                ))}
            {skills.length > 5 && <div>...</div>}
        </div>
        <div className="languages-container" >
            {languages.slice(0, 5).map((language, index) => (
                    <div key={index} class="langbubble"> {language} </div>
                ))}
            {languages.length > 5 && <div>...</div>}
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