import {React, useState} from 'react'
import { Link } from 'react-router-dom';

function NavBar() {
    const [active, setActive] = useState(0);

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

    return (
        <>
            <img class="logo" src={require('../assets/logoTeam.png')} title="" alt=""></img>
            <div class="sidenav">
                {
                    Object.keys(navigations).map(id => {
                        let navLink = navigations[id]
                        const isActive = active === id

                        return (
                            <Link className={isActive ? "link active" : "link inactive"} id="link" to={navLink.Link} onClick={() => {setActive(id)}}>
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