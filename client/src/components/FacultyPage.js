import Validate from './Validate';
import { Link } from 'react-router-dom';
import { React, useState, useEffect } from 'react';
import axios from "axios"
import Group_Table from './Faculty_Items/Group_Table';

function Faculty_Page() {
    const [isLoading, setLoading] = useState(true);
    const [groups, setGroups] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/admin/group_info/`);
                setGroups(res.data);
                setLoading(false)
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return <Faculty_Page_Render isLoading={true}/>
    }

    return <Faculty_Page_Render madeGroups={groups.groups} students={groups.students} projects={groups.projects}/>
}

function Faculty_Page_Render({isLoading, madeGroups, students, projects}) {
    // const GroupProfiles = Profiles.map(group => (
    //     <Group_Table
    //     //group id, name, members (firstName,lastName), # of members, groupStatus, and (formedgroup?)
    //         id={group.id}
    //         name={group.name}
    //         members={group.members}
    //         membersCount={group.membersCount}
    //         status={group.status}
    //         formed={group.formed}
    //         index={group.index}
    //     />
    // ));
    if (isLoading) {
        return (
            <>
                <header class="header">
                <img class="logo" src={require('../assets/logoTeam.png')} title="" alt=""></img>
                    <h2 id="page_title" >Faculty</h2>
                    {/* import header and get the button click to faculty page as a js function to change the title  */}
                    <Link className="link" to="/"><p>Return to Login</p></Link>
                </header>
                <div class="admin_body">
                    <h2>Loading...</h2>
                </div>
            </>
        )
    }

    const [inputs, setInputs] = useState({
        ProjectNum: "",
        Title: "",
        ProjectType: ""
    });
    const [editInputs, setEditInputs] = useState({
        groupId: "",
        groupSizePref: ""
    });

    const onChange = (e) => {
        setInputs((previous) => ({ 
            ...previous, 
            [e.target.name]: e.target.value
        }));
    };
    const onChange2 = (e) => {
        setEditInputs((previous) => ({ 
            ...previous, 
            [e.target.name]: e.target.value
        }));
    };

    const handleSumbit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:8800/api/admin/add_project", inputs)
            setInputs({
                ProjectNum: "",
                Title: "",
                ProjectType: ""
            })
            console.log(res)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    const handleEditSumbit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:8800/api/admin/change_group_size", editInputs)
            setEditInputs({
                groupId: "",
                groupSizePref: ""
            })
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    const leftoversClick = async (e) => {
        e.preventDefault()
        try {
            var payload = {
                debug: true
            }
            const res = await axios.post(`http://localhost:8800/api/remaining_students`, payload);
            console.log(res)
        } catch (err) {
            console.log(err);
        }
        window.location.reload();
    }

    return (
        <>
            <div>
                <header className="header">
                    {" "}
                    {/* className instead of class */}
                    <img
                        className="logo"
                        src={require("../assets/logoTeam.png")}
                        alt=""
                    />
                    <h2 id="page_title">Faculty</h2>
                    <Link className="link" to="/">
                        <p>Return to Login</p>
                    </Link>
                </header>
                <div className="admin_body">
                    <h2>Groups</h2>
                    <div>
                        <table id="Groups" style={{ width: "90%" }}>
                            <thead>
                                <tr>
                                    <th style={{ width: "10%" }}>Group Id</th>
                                    <th style={{ width: "15%" }}>Group Name</th>
                                    <th style={{ width: "55%" }}>Group Members</th>
                                    <th style={{ width: "10%" }}>Group Size</th>
                                    <th style={{ width: "10%" }}>Group Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {madeGroups.map((group) => (
                                    <tr key={group.groupId}>
                                        {/* Each child in a list should have a unique "key" prop */}
                                        <td>{group.groupId}</td>
                                        <td>{group.groupName}</td>
                                        <td>{group.groupMembers}</td>
                                        <td>{group.membersCount}</td>
                                        {/* Assumed correction for group size */}
                                        <td>{group.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <h2>Edit Group Size</h2>
                    {/* <form nmae="addProject" style={{ display: "block", textAlign: "center" }} >
                        <label for="groupId">Group ID</label><br></br>
                        <input type="text" id="Title" name="groupId" onChange={onChange2}/><br></br>
                        <label for="groupSizePref">Group Size Preference:</label><br></br>
                        <input type="text" id="groupSizePref" name="groupSizePref" onChange={onChange2}/><br></br>
                        <button class="button" onClick={handleEditSumbit}>Edit</button><br></br><br></br>
                    </form> */}
                    <h2>Add a Project</h2>
                    <form nmae="addProject" style={{ display: "block", textAlign: "center" }} >
                        <label for="ProjectNum">Project Num:</label><br></br>
                        <input type="text" id="ProjectNum" name="ProjectNum" onChange={onChange}/><br></br>
                        <label for="Title">Title:</label><br></br>
                        <input type="text" id="Title" name="Title" onChange={onChange}/><br></br>
                        <label for="ProjectType">Project Type:</label><br></br>
                        <input type="text" id="ProjectType" name="ProjectType" onChange={onChange}/><br></br>
                        <button class="button" onClick={handleSumbit}>Save</button><br></br><br></br>
                    </form>
                    <h2>Projects</h2>
                    <table id="Students" style={{ width: "90%" }}>
                        <thead>
                            <tr>
                                <th style={{ width: "33%" }}>Project Number</th>
                                <th style={{ width: "33%" }}>Title</th>
                                <th style={{ width: "33%" }}>Project Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((group) => (
                                <tr>
                                    <td>{group.projectNum}</td>
                                    <td>{group.title}</td>
                                    <td>{group.projType}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h2>Students</h2>
                        <table id="Students" style={{ width: "90%" }}>
                            <thead>
                                <tr>
                                    <th style={{ width: "33%" }}>Student ID</th>
                                    <th style={{ width: "33%" }}>First Name</th>
                                    <th style={{ width: "33%" }}>Last Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((group) => (
                                    <tr>
                                        <td>{group.studentId}</td>
                                        <td>{group.firstName}</td>
                                        <td>{group.lastName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    <button onClick={leftoversClick}>Group Up Leftover</button>
                </div>
            </div>
        </>
    )    
}

export default Faculty_Page;