import React, { Component } from 'react';
import './header.css';
import {NavLink} from 'react-router-dom';
import {authContext} from '../../contexts/authContext';
import logo from '../../assets/logo.jpg';

class Header extends Component {
    static contextType=authContext;

    render() {
        const {loginStatus}=this.context;
        return ( 
            <>
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <div className="container">

                        <a className="navbar-brand me-auto" href="/">
                            <div className="title ms-4"><img src={logo} alt="logo" width="40" height="40"/> <span className="ms-2">TestU</span></div>
                        </a>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navId" aria-controls="navId" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        
                        <div className="collapse navbar-collapse" id="navId">
                            <ul className="navbar-nav ms-auto me-4 nav">
                                {!loginStatus
                                    ?
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/login">
                                                <span className="fa fa-sign-in fa-lg"></span> Log in
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/signup">
                                                <span className="fa fa-sign-in fa-lg"></span> Sign up
                                            </NavLink>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/home">
                                                <span className="fa fa-home fa-lg"></span> Home
                                            </NavLink>
                                        </li>

                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/creates">
                                                <span className="fa fa-list fa-lg"></span> Creates
                                            </NavLink>
                                        </li>

                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/taken">
                                                <span className="fa fa-list fa-lg"></span> Taken
                                            </NavLink>
                                        </li>

                                        <li className="nav-item dropdown">
                                            <div className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <span className="fa fa-user fa-lg mt-1"></span>
                                            </div>

                                            <ul className="dropdown-menu mx-3" aria-labelledby="navbarDropdownMenuLink">
                                                <NavLink className="dropdown-item nav-link" to="/user"><span className="fa mx-1 fa-id-badge fa-lg"></span> Profile</NavLink>
                                                <NavLink className="dropdown-item nav-link" to="/" onClick={this.context.logOut}><span className="fa mx-1 fa-sign-out fa-lg"></span> Sign out</NavLink>
                                            </ul>
                                        </li>
                                    </>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </>
        );
    }
}
export default Header;
