import React, { Component } from 'react';
import {
    Card, CardImg, CardBody, Button, CardHeader} from 'reactstrap';
import './style.css'
import dummyUser from '../../assets/dummyUser.png'
import { Link } from 'react-router-dom';

class Profile extends Component {
    constructor(props) {
        super(props);
        
        this.state= {
            username: 'Admin',
            email: 'admin@gmail.com',
            address: 'IIT Bhubaneswar'
        }
    }

    
    render() {
        return (
            <div className="container user">
                <div className="row">
                    <div className="col-12">
                        <Card>
                            <CardHeader style={{color:'blue'}}>
                                <div className="row">
                                    <strong>Profile Info.</strong>
                                    <div className="ml-auto">
                                        <Link to={`/user/edit`}>
                                            <Button className="fa fa-pencil fa-lg" outline onClick={this.toggleModal}></Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardHeader>
                            <div className="row">
                                <div className="col-8">
                                    <CardBody>
                                        <dl className="row p-1">
                                            <dt className="col-5">User</dt>
                                                <dd className="col-7">{this.state.username}</dd>
                                            <dt className="col-5">E-mail</dt>
                                                <dd className="col-7">{this.state.email}</dd>
                                            <dt className="col-5">Address</dt>
                                                <dd className="col-7">{this.state.address}</dd>
                                        </dl>
                                    </CardBody>
                                </div>
                                <div className="col-4 Img">
                                    <CardImg className="img" src={dummyUser} alt="User" />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-12">
                        <Card>
                            <CardHeader style={{color:'blue'}}>
                                    <strong>Stats</strong>
                            </CardHeader>
                            <div className="row">
                                <div className="col-10">
                                    <CardBody>
                                        <dl className="row p-1">
                                            <dt className="col-6">Total Created Quizzes</dt>
                                                <dd className="col-6">{this.state.username}</dd>
                                            <dt className="col-6">Total Attemted Quizzes</dt>
                                                <dd className="col-6">{this.state.email}</dd>
                                            <dt className="col-6">Best Performance</dt>
                                                <dd className="col-6">{this.state.address}</dd>
                                        </dl>
                                    </CardBody>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;