import React, { Component } from 'react';
import dummyUser from '../../assets/dummyUser.png'
import { Link } from 'react-router-dom';
import {authContext} from '../../contexts/authContext';
import './style.css'

class Profile extends Component {
    static contextType=authContext;

    render() {

        const {user}=this.context;

        return (
            <div className="container user pt-5 px-2">
                <div className="main-body">
                    <div className="row gutters-sm justify-content-center">
                        <div className="col-md-7">
                            <div className="card mb-3">
                                <div className="card-header border-0 bg-info text-white mt-1 ms-1 me-1 border-1">
                                    <div className="row align-items-center">
                                        <h5 className="col-auto ms-2">Profile Info.</h5>
                                        
                                        <div className="col-auto ms-auto me-3">
                                            <Link to={`/user/edit`}>
                                                <button className="btn btn-outline-light"><span className="fa fa-pencil fa-lg"></span> </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row mt-1">
                                        <div className="col-sm-3">
                                            <h5 className="mb-0">User Name</h5>
                                        </div>
                                        <div className="col-sm-9 text-secondary">{user.username}</div>
                                    </div>
                                <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h5 className="mb-0">Email</h5>
                                        </div>
                                        <div className="col-sm-9 text-secondary">{user.emailId}</div>
                                    </div>
                                <hr />
                                    <div className="row mb-2">
                                        <div className="col-sm-3">
                                            <h5 className="mb-0">Institute</h5>
                                        </div>
                                        <div className="col-sm-9 text-secondary">{user.institute}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="card mt-4">
                                <div className="card-header border-0 mt-1 mx-1">
                                    <div className="row align-items-center">
                                        <h5 className="col-auto ms-2 text-danger">Stats</h5>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-4 col-sm-6">
                                            <h5 className="mb-0">Total Created Tests</h5>
                                        </div>
                                        <div className="col-md-8 col-sm-6 text-secondary">{user.createdList.length}</div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-md-4 col-sm-6">
                                            <h5 className="mb-0">Total Attemted Tests</h5>
                                        </div>
                                        <div className="col-md-8 col-sm-6 text-secondary">{user.takenList.length}</div>
                                    </div>
                                    <hr/>
                                    <div className="row mb-2">
                                        <div className="col-md-4 col-sm-6">
                                            <h5 className="mb-0">Best Performance</h5>
                                        </div>
                                        <div className="col-md-8 col-sm-6 text-secondary">0</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="card mt-4 mt-md-0">
                                <div className="card-body">
                                    <div className="align-items-center text-center">
                                        <img src={dummyUser} alt="Admin" className="rounded-circle" width="150" />
                                        <div className="mt-3">
                                            <h4>{user.username}</h4>
                                            <p className="text-secondary mb-1">{user.description ||"Full Stack Developer"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card mt-4">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-github mr-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>Github</h6>
                                        <span className="text-secondary">{user.github || "-"}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-twitter mr-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h6>
                                        <span className="text-secondary">{user.twitter || "-"}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-instagram mr-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>Instagram</h6>
                                        <span className="text-secondary">{user.instagram ||"-"}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
                                        <span className="text-secondary">{user.facebook ||"-"}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;