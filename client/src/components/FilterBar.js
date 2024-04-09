import React from "react";

function FilterBar()
{
    return(
        <div class="filerbar">
        <button class="filterbutton">Group Size</button>
        <button class="filterbutton">Project Preference</button>
        <button class="filterbutton">Skills</button>
        <button class="filterbutton">Languages</button>
        <form style={{display:"flex", flexDirection:"row", gap:"10px"}}>
                <input class="outline" type="text" name="search" value="Search Student by Name..." style={{border:"1px solid gray", borderRadius:"20px", width:"300px", paddingLeft:"10px", paddingRight:"10px", color:"lightgray"}}/>
                <button class="filterbutton">Search</button>
        </form>                
      </div>
    )
}

export default FilterBar;