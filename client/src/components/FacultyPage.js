import Validate from './Validate';
import { Link } from 'react-router-dom';
import { React, useState, useEffect } from 'react';
import axios from "axios"
import Group_Table from './Faculty_Items/Group_Table';

function Faculty_Page() {

    // in-depth look at group data (need to make tabular later) 
    const GroupProfiles = Profiles.map(group => (
        <Group_Table
        //group id, name, members (firstName,lastName), # of members, groupStatus, and (formedgroup?)
            id={group.id}
            name={group.name}
            members={group.members}
            membersCount={group.membersCount}
            status={group.status}
            formed={group.formed}
            index={group.index}
        />
    ));

    const [groups, setGroups] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/admin/group_info/`); /*change host to what the api on on my machine*/
                setGroups(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []); // Empty dependency array ensures this effect runs only once

    return (
        <>
        <header class="header">
        <img class="logo" src={require('../assets/logoTeam.png')} title="" alt=""></img>
            <h2 id="page_title" >Faculty</h2>
            {/* import header and get the button click to faculty page as a js function to change the title  */}
            <Link className="link" to="/"><p>Return to Home</p></Link>
        </header>
        <div class="admin_body">
            {/* <form>
                <label for="name">Search:</label>
                <input type="text" name="name"/>
            </form> */}
            <h2>Groups</h2>
            {GroupProfiles}
            <table id="Groups" width="90%">
            <tr>
                <th width="10%">Project Number</th>
                <th width="55%" text-align="left" >Group Members</th> 
                {/* text align above not working  */}
                <th width="10%">Group Size</th>
                <th width="10%">Deadline</th>
                <th width="15%">Status</th>
            </tr>
            <tr>
                <td>1</td>
                <td>Maria Anders</td> 
                <td><input type="number"/></td>
                <td>
                    <form>
                        <input type="date" name="party" min="2000-01-01" max="2030-12-30" />
                    </form>
                </td>
                <td><Validate /></td>
            </tr>
            <tr>
                <td>2</td>
                <td>Francisco Chang</td> 
                <td><input type="number"/></td>
                <td>
                    <form>
                        <input type="date" name="party" min="2000-01-01" max="2030-12-30" />
                    </form>
                </td>
                <td><Validate /></td>
            </tr>
            </table>

            {/* implement pagination with tables? */}
            <h2>Students</h2>
            <table id="Students" width="90%">
                <tr>
                    <th width="80%" >Name</th>
                    <th width="10%">Project Number</th>
                </tr>
                <tr>
                    <td>Billy Bob</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>Jane Doe</td>
                    <td>2</td>
                </tr>
            </table>
        </div>
        </>
    )
}

export default Faculty_Page;

const Profiles = [ // group profiles
        //group id, name, members (firstName,lastName), # of members, groupStatus, and (formedgroup?)
    {
        id: "g0",
        name: "Coding Gurus",
        members: ["Jane Doe", "James Gunn"],
        //id: "p0",  is this needed?
        membersCount: 2,
        status: "open",
        formed: "yes/no",
        index:0 //is this needed?
    },
    {
        id: "g1",
        name: "Hackers",
        members: ["Star Lord", "Rocket Raccoon", "Peter Quill", "Baby Groot"],
        //id: "p1",  is this needed?
        membersCount: 4,
        status: "closed",
        formed: "yes/no",
        index:1 //is this needed?
    },
];