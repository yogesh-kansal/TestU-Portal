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
                <div className="row justify-content-center">
                    <div className="col-12 col-md-9">
                        <div className="card">
                            <div className="card-header border-0 bg-info text-white">
                                <div className="row align-items-center">
                                    <h4 className="col-auto ms-2">Profile Info.</h4>
                                    
                                    <div className="col-auto ms-auto me-3">
                                        <Link to={`/user/edit`}>
                                            <button className="btn btn-outline-light"><span className="fa fa-pencil fa-lg"></span> </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-center card-body">
                                <div className="col-12 col-md-8 info">
                                    <dl className="row">
                                        <dt className="col-5">User</dt>
                                            <dd className="col-7">{user.username}</dd>
                                        <dt className="col-5">E-mail</dt>
                                            <dd className="col-7">{user.emailId}</dd>
                                        <dt className="col-5">Institute</dt>
                                            <dd className="col-7">{user.institute}</dd>
                                    </dl>
                                </div>
                                <div className="col-4 d-none d-md-inline">
                                    <img className="img-fluid" src={dummyUser} alt="User" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-5 justify-content-center">
                    <div className="col-12 col-md-9">
                        <div className="card">
                            <div className="card-header border-0 bg-info text-white">
                                    <h4>Stats</h4>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-10">
                                    <div className="card-body">
                                        <dl className="row p-1">
                                            <dt className="col-6">Total Created Quizzes</dt>
                                                <dd className="col-6">{user.createdList.length}</dd>
                                            <dt className="col-6">Total Attemted Quizzes</dt>
                                                <dd className="col-6">{user.takenList.length}</dd>
                                            <dt className="col-6">Best Performance</dt>
                                                <dd className="col-6">0</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;