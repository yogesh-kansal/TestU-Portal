import React, { Component } from 'react';
import './header.css';
import {NavLink} from 'react-router-dom';
import {authContext} from '../../contexts/authContext'
class Header extends Component {
    static contextType=authContext;

    state = {
        isNavOpen: false,
        isLoggedin: false
    }

    toggleNav =()=> {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }

    render() {
        const {isLoggedin}=this.context;
        return ( 
            <>
                <nav class="navbar navbar-expand-lg navbar-dark">
                    <div className="container">

                        <a className="navbar-brand me-auto" href="/">
                            <div className="title ms-4">Exam Portal</div>
                        </a>

                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navId" aria-controls="navId" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        
                        <div class="collapse navbar-collapse" id="navId">
                            <ul class="navbar-nav ms-auto me-4 nav">
                                {!isLoggedin
                                    ?
                                    <>
                                        <li class="nav-item">
                                            <a className="nav-link" to="/login">
                                                <span className="fa fa-sign-in fa-lg"></span> Log in
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <NavLink className="nav-link" to="/signup">
                                                <span className="fa fa-user-plus fa-lg"></span> Sign up
                                            </NavLink>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li class="nav-item">
                                            <NavLink className="nav-link" to="/home">
                                                <span className="fa fa-home fa-lg"></span> Home
                                            </NavLink>
                                        </li>

                                        <li class="nav-item">
                                            <NavLink className="nav-link" to="/creates">
                                                <span className="fa fa-address-card fa-lg"></span> Creates
                                            </NavLink>
                                        </li>

                                        <li class="nav-item">
                                            <NavLink className="nav-link" to="/taken">
                                                <span className="fa fa-info fa-lg"></span> Taken
                                            </NavLink>
                                        </li>

                                        <li class="nav-item">
                                            <NavLink className="nav-link ml-2" to="/user">
                                                <span className="fa fa-user fa-lg"></span>
                                            </NavLink>
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
