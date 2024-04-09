import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const Group_Table= ({groupId, groupName, groupMembers, groupSz, groupStatus, formedGroup}) => {
return(
     // gets group id, name, members (firstName,lastName), # of members, groupStatus, and (formedgroup?)
    <div>
        <div text-align="left">
        <p>Group Name: {groupName}</p>
        <p>Group Id: {groupId}</p>
        {/* <p>Members: {groupMembers.join(", ")}</p> */}
        <p>Group Size: {groupSz}</p>
        <p>Group Status: {groupStatus}</p>
        <p>Formed Group: {formedGroup}</p>
        </div>
    </div>
        
)
   

}

export default Group_Table;