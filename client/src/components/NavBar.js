import { React, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';

function NavBar() {
    const location = useLocation();
    const [url, setUrl] = useState(null);

    const navigations = {
        0: {
            Name: "Home",
            Link: "/"
        },
        1: {
            Name: "Invitations",
            Link: "/invitations"
        },
        2: {
            Name: "Requests",
            Link: "/requests"
        },
        3: {
            Name: "Quiz",
            Link: "/quiz"
        },
        4: {
            Name: "Admin",
            Link: "/admin"
        },
        5: {
            Name: "FAQ",
            Link: "/faq"
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