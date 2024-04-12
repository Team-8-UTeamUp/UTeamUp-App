import React from 'react'
import NavBar from './NavBar';
import Student_Enlarge from './StudentView/Student_Enlarge';

function Profile_Page() {
    const MyProfile= 
    <Student_Enlarge
        name={Profile.name}
        skillset={Profile.skills}
        languages={Profile.codingLanguages}
        preferences={Profile.preferences}
        groupSz={Profile.groupSizePreference}
        bio={Profile.bio}
    />
    return (
    <>
    <div class="row">
        <div class="column left">
            <NavBar/>
        </div>
        <div class="column right">
            <h2>My Profile</h2>
        </div>
    </div>
    <div class="screen">
        <div style={{display:"flex", justifyContent: "center",
  alignItems: "center"}}>
        {MyProfile}
        </div>
    </div>
    </>
    )
}

export default Profile_Page;

const Profile=
{
    
        name: "Henry Johnson",
        id: "p15",
        index: 2,
        photo: '../assets/profilePhoto.png',
        codingLanguages: ["Python", "JavaScript", "Ruby"],
        skills: ["Database", "Mobile Development"],
        preferences: [
          ["ProjectE", "ProjectD", "ProjectA", "ProjectB", "ProjectC"],
          ["ProjectA", "ProjectC", "ProjectD", "ProjectB", "ProjectE"]
        ],
        groupSizePreference: 7,
        bio: "Seasoned developer proficient in Python, JavaScript, and Ruby. Specialized in database management and mobile app development."
      
}