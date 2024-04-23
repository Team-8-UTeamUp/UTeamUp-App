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
        <div>
        <table id="Groups" width="90%">
            <tr>
                <th width="10%">Group Name</th>
                <th width="55%">Group Id</th>
                <th width="10%">Group Size</th>
                <th width="10%">Group Status</th>
                <th width="15%">FormedGroup</th>
            </tr>
            <tr>
                <td>{groupName}</td>
                <td>{groupId}</td> 
                <td>{groupSz}</td>
                <td>{groupStatus}</td>
                <td>{formedGroup}</td>
            </tr>
            </table>
        </div>
    </div>
        
)
   

}

export default Group_Table;