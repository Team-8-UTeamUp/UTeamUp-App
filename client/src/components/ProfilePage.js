import React, {useState} from 'react'
import NavBar from './NavBar';
import Student_Enlarge from './StudentView/Student_Enlarge';
import axios from "axios"
import Website_Login from './Login_Page/Website_Login';
import { AuthContext } from './Login_Page/AuthContext';

function Profile_Page() {
    const [Profile, setSProfile] = useState([])
    const [isLoading, setLoading] = useState(true);
    const { studentId, setStudent } = React.useContext(AuthContext);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/student_profile?studentId=${studentId}`);
                setSProfile(res.data);
                setLoading(false)
            } catch (err) {
                console.log(err);
            }
        }

        fetchData();
    }, []);

    if (isLoading) {
        return <Profile_Page_Render isLoading={true}/>
    }

    return <Profile_Page_Render Profile={Profile} isLoading={false}/>
}

function Profile_Page_Render({Profile, isLoading}) {
    if (isLoading) {
        return (
            <>
                <div class="row">
                    <div class="column left">
                        <NavBar/>
                    </div>
                    <div class="column right">
                        <h2>My Profile</h2>
                        <p style={{color:"gray", fontStyle:"italic", marginTop:"10px"}}>To edit your profile, please visit the quiz page.</p>
                    </div>
                </div>
                <div class="screen">
                    <div style={{display:"flex", justifyContent: "center", alignItems: "center"}}>
                        <h2>Loading...</h2>
                    </div>
                </div>
            </>
        )
    }

    const MyProfile = <Student_Enlarge
            name={Profile.name}
            skillset={Profile.skills}
            languages={Profile.codingLanguages}
            preferences={Profile.preferences}
            groupSz={Profile.groupSizePreference}
            bio={Profile.bio}
            profileView={true}
            />

    return (
    <>
        <div class="row">
            <div class="column left">
                <NavBar/>
            </div>
            <div class="column right">
                <h2>My Profile</h2>
                <p style={{color:"gray", fontStyle:"italic", marginTop:"10px"}}>To edit your profile, please visit the quiz page.</p>
            </div>
        </div>
        <div class="screen">
            <div style={{display:"flex", justifyContent: "center", alignItems: "center", paddingTop:"40px"}}>
                {MyProfile}
            </div>
        </div>
    </>
    )
}

export default Profile_Page;


