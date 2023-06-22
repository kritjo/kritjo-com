import React from "react";
import './navbar.css'
import {NavLink} from "react-router-dom";

function Navbar() {
    let activeStyle = {
        textDecoration: "underline",
    };
    
    return (
        <nav className={"navbar"}>
            <ul>
                <li>
                    <NavLink
                        to="/" end
                        style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/github"
                        style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }
                    >
                        Github
                    </NavLink>
                </li>
                <li>
                    <a target="_blank" rel="noreferrer noopener" href={"https://www.linkedin.com/in/tjeltajohansen/"}>
                        LinkedIn <i className="fa fa-external-link"></i>
                    </a>
                </li>
                <li>
                    <NavLink
                        to="/contact"
                        style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }>
                        kritjo@kritjo.com
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;