import React, { Component } from 'react';
import {Card, CardBody, CardHeader, Button, 
    Form, FormGroup, Label, Input} from 'reactstrap';
import './style.css';

class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            new_name: '',
            new_email: '',
            new_adds: '',
            old_pass: '',
            new_pass: '',
            touched: {
                user: '',
                email: '',
                add: '',
            }
        }
        
    }

    //for touchng th box
    handleTouch =(feild) =>(e) => {
        this.setState({
            touched: {...this.state.touched, [feild]:true}
        });
    }

    handleChange=(e) => {
        this.setState({
            [e.target.id]:e.target.value
        });
    }

    //validating the form
    validate(user,email,adds) {
        const err ={
            user: '',
            email:'',
            adds: ''
        }
        let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if(this.state.touched.email && !mailformat.test(email))
            err.email='Mail format is not correct';
        if(this.state.touched.user && user.length<3)
            err.user='usernmae must be atleat of lenght 3';
        else if(this.state.touched.pass && user.length>8)
            err.user='username must be atmax of lenght 8';
        if(this.state.touched.adds && adds.length===0)
            err.adds='Addess must be non-empty';
        return err;
    }
    

    render() {
        let errs=this.validate(this.state.new_name, this.state.new_email,this.state.new_adds);
        return (
            <div className="container user">
                <div className="row">
                    <div className="col-12">
                        <Card>
                        <CardHeader style={{color:'blue'}}>
                                    <strong>Edit profile</strong>
                            </CardHeader>
                        </Card>
                        <CardBody>
                                <div className="row">
                                    <div className="col-auto">
                                        <strong>Edit Basic Info.</strong>
                                        <hr></hr>
                                    </div> 
                                </div>

                                <div className="row p-5">
                                    <div className="col-12 col-md-7">
                                        <Form >
                                            <FormGroup row>
                                                <Label htmlFor="new_username" className="col-5">Username</Label>
                                                <Input type="text" id="new_username" className="col-7"
                                                    valid={errs.user===''}
                                                    invalid={errs.user!==''}
                                                    value={this.state.new_name}
                                                    onBlur={this.handleTouch('user')}
                                                    onChange={this.handleChange}/>
                                            </FormGroup>

                                            <FormGroup row>
                                                <Label htmlFor="new_email" className="col-5">Email</Label>
                                                <Input type="email" id="new_email" className="col-7"
                                                    valid={errs.email===''}
                                                    invalid={errs.email!==''}
                                                    value={this.state.new_email}
                                                    onBlur={this.handleTouch('email')}
                                                    onChange={this.handleChange}/>
                                            </FormGroup>

                                            <FormGroup row>
                                                <Label htmlFor="cnew_add" className="col-5">Address</Label>
                                                <Input type="text" id="cnew_add" className="col-7"
                                                    valid={errs.adds===''}
                                                    invalid={errs.adds!==''}
                                                    value={this.state.new_adds}
                                                    onBlur={this.handleTouch('adds')}
                                                    onChange={this.handleChange}/>
                                            </FormGroup>

                                            <FormGroup row>
                                                <div className="col-6 ml-auto">
                                                    <Button type="submit" color="primary" outline>Edit Info.</Button>
                                                </div>
                                                </FormGroup>
                                        </Form>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-auto">
                                        <strong>Reset Password</strong>
                                        <hr></hr>
                                    </div> 
                                </div>

                                <div className="row p-5">
                                    <div className="col-12 col-md-7">
                                        <Form >
                                            <FormGroup row>
                                                <Label htmlFor="old_pass" className="col-5">Old Password</Label>
                                                <Input type="password" id="old_pass" className="col-7"
                                                    value={this.state.old_pass}
                                                    onChange={this.handleChange}/>
                                            </FormGroup>

                                            <FormGroup row>
                                                <Label htmlFor="new_pass" className="col-5">New Password</Label>
                                                <Input type="password" id="new_pass" className="col-7"
                                                    value={this.state.new_pass}
                                                    onChange={this.handleChange}/>
                                            </FormGroup>

                                            <FormGroup row>
                                                <div className="col-6 ml-auto">
                                                    <Button type="submit" color="primary" outline>Reset Password</Button>
                                                </div>
                                                </FormGroup>
                                        </Form>
                                    </div>
                                </div>
                        </CardBody>
                    </div> 
                </div>    
            </div>
        );
    }
}

export default Edit;