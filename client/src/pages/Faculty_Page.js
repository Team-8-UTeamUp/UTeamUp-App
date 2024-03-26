import React from 'react'
import Validate from '../pages/Validate';

function Faculty_Page() {
    return (
        <>
        <div class="faculty-top">
            <h2>Faculty</h2><br></br>s
            {/* import header and get the button click to faculty page as a js function to change the title  */}
        </div>
        <div>
            <form>
                <label for="name">Search:</label>
                <input type="text" name="name"/>
            </form>
            <h2>Groups</h2>
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