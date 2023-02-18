import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getIsLoggedIn } from "../../store/users";
import NavProfile from "./navProfile";

const NavBar = () => {
    const isLoggedIng = useSelector(getIsLoggedIn());
    return (
        <nav className="navbar bg-light mb-3">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/">
                            Main
                        </Link>
                    </li>
                    {isLoggedIng && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/users">
                                Users
                            </Link>
                        </li>
                    )}
                </ul>
                <div className="d-flex nav">
                    {isLoggedIng ? (
                        <NavProfile />
                    ) : (
                        <Link className="nav-link" to="/login">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;