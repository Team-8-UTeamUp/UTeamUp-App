import { React, useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from './Login_Page/AuthContext';

function NavBar() {
    const location = useLocation();
    const [url, setUrl] = useState(null);
    const { studentId, setStudent } = useContext(AuthContext); // clear netid after log out

    const navigations = {
        0: {
            Name: "Home",
            Link: "/homepage"
        },
        1: {
            Name: "Profile",
            Link: "/profile"
        },
        2: {
            Name: "Invitations",
            Link: "/invitations"
        },
        3: {
            Name: "Requests",
            Link: "/requests"
        },
        4: {
            Name: "Quiz",
            Link: "/quiz"
        },
        5: {
            Name: "FAQ",
            Link: "/faq"
        },
        6: {
            Name: "Admin",
            Link: "/login"
        },
        7: {
            Name:"Log Out",
            Link:"/"
        }
    }

    useEffect(() => {
        setUrl(location.pathname);
    }, [location]);

    return (
        <>
            <img class="logo" src={require('../assets/logoTeam.png')} title="" alt=""></img>
            <div class="sidenav">
                {
                    Object.keys(navigations).map(id => {
                        let navLink = navigations[id]

                        if(navLink === 7)
                        {
                            setStudent(" ")
                            localStorage.setItem("studentId", " "); // Store studentId in local storage
                        }

                        return (
                            <Link className={"link " + (url === navLink.Link ? "active" : "inactive")} id="link" to={navLink.Link}>
                                <p>{navLink.Name}</p>
                            </Link>
                        )
                    })
                }
            </div>
        </>
    )
}

export default NavBar;