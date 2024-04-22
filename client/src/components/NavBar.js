import { React, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';

function NavBar() {
    const location = useLocation();
    const [url, setUrl] = useState(null);

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