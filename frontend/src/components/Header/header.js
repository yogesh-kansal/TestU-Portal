import React, { Component } from 'react';
import './header.css';
import { Navbar, NavbarBrand, NavbarToggler,
     NavItem, Collapse, Nav} from 'reactstrap'; 
import {NavLink} from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isLoggedin: true
        }

        this.toggleNav =this.toggleNav.bind(this);
    }

    toggleNav()
    {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })

    }

    render() {
        return ( 
            <>
                <Navbar dark className="navbar" expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav}/>

                        <NavbarBrand className="mr-auto" href="/">
                            <div className="title ml-4">Quiz-n-trivia</div>
                        </NavbarBrand>

                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar className="ml-auto nav">
                                {!this.state.isLoggedin
                                    ?
                                    <>
                                        <NavItem>
                                            <NavLink className="nav-link" to="/login">
                                                <span className="fa fa-sign-in fa-lg"></span> Log in
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="nav-link" to="/signup">
                                                <span className="fa fa-user-plus fa-lg"></span> Sign up
                                            </NavLink>
                                        </NavItem>
                                    </>
                                    :
                                    <>
                                        <NavItem>
                                            <NavLink className="nav-link" to="/home">
                                                <span className="fa fa-home fa-lg"></span> Home
                                            </NavLink>
                                        </NavItem>

                                        <NavItem>
                                            <NavLink className="nav-link" to="/Creates">
                                                <span className="fa fa-address-card fa-lg"></span> Creates
                                            </NavLink>
                                        </NavItem>

                                        <NavItem>
                                            <NavLink className="nav-link" to="/taken">
                                                <span className="fa fa-info fa-lg"></span> Taken
                                            </NavLink>
                                        </NavItem>

                                        <NavItem>
                                            <NavLink className="nav-link ml-2" to="/user">
                                                <span className="fa fa-user fa-lg"></span>
                                            </NavLink>
                                        </NavItem>
                                    </>
                                }
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </>
        );
    }
}
export default Header;

/**
 *  <Jumbotron>
                    <div className="container">
                        <div className="row jumbo justify-content-center">
                            <div className="col-12 col-sm-6">
                                <h1>memeKeeper</h1>
                                <p>Hey, Guys
                                This is Yogesh Kansal prenseting this web app to keep your all memes at one place</p> 
                            </div>
                            <div className="col-12 col-sm">
                                </div>
                        </div>
                    </div>
                </Jumbotron>
 */

                /**
                 * <div className="image">
                <img src="logo.jpg" alt="logo"/>
                </div>
                 */