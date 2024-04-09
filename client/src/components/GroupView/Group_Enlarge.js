import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const Group_Enlarge= ({name, skillset, languages, preferences, groupSz, bio}) => {
return(

    <div>
        <div text-align="left">
        <h2>{name}</h2>
        <p>Skills: {skillset.join(", ")}</p>
        <p>Coding Languages: {languages.join(", ")}</p>
        <p>Preferences: {preferences.map(preference => preference.join(", ")).join(" | ")}</p>
        <p>Group Size Preference: {groupSz}</p>
        <p>Bio: {bio}</p>
        </div>
    </div>
        
)
   

}

export default Group_Enlarge;