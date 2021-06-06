import React, { Component } from 'react';
import {Form, FormGroup, Label, Input,Button, FormFeedback} from 'reactstrap';
import './style.css'

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state= {
            email: '',
            username: '',
            password: '',
            touched: {
                email: false,
                pass: false
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
    validate(user,email,pass) {
        const err ={
            user: '',
            email:'',
            pass:''
        }
        let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if(this.state.touched.email && !mailformat.test(email))
            err.email='Mail format is not correct';
        if(this.state.touched.user && user.length<3)
            err.user='usernmae must be atleat of lenght 3';
        else if(this.state.touched.pass && user.length>8)
            err.user='username must be atmax of lenght 8';
        if(this.state.touched.pass && pass.length<6)
            err.pass='Password must be atleat of lenght 6';
        return err;
    }

    handleSubmit=(e) => {
        e.preventDefault();
        console.log(this.state);

        alert("your data has been sent successfully"+JSON.stringify(this.state))
    }

    render() {
        let errs=this.validate(this.state.username, this.state.email,this.state.password);

        return (
            <div className="form_style">
                <div className="container form">
                    <div className="row">
                        <div className="col-auto style">
                            <h3>Sign Up</h3>
                            <hr></hr>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-11 col-sm-8">
                            <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                    <Label htmlFor="username" className="style col-12 col-sm-6">Username</Label>
                                    <Input type="text" id="username" className="col-12 col-sm-9" 
                                        placeholder="Your choice..."
                                        valid={errs.user===''}
                                        invalid={errs.user!==''}
                                        value={this.state.username}
                                        onBlur={this.handleTouch('user')}
                                        onChange={this.handleChange}>
                                    </Input>                                    
                                    <FormFeedback>{errs.user}</FormFeedback>
                                </FormGroup>

                                <FormGroup row>
                                    <Label htmlFor="email" className="style col-12 col-sm-6">Email Id</Label>
                                    <Input type="email" id="email" className="col-12 col-sm-9" 
                                        placeholder="User Email Id..."
                                        valid={errs.email===''}
                                        invalid={errs.email!==''}
                                        value={this.state.email}
                                        onBlur={this.handleTouch('email')}
                                        onChange={this.handleChange}>
                                    </Input>
                                    <FormFeedback>{errs.email}</FormFeedback>
                                </FormGroup>

                                <FormGroup row>
                                    <Label htmlFor="password" className="style col-12 col-sm-6">Password</Label>
                                    <Input type="password" id="password"  className="col-12 col-sm-9" 
                                        placeholder="Your Password..."
                                        valid={errs.pass===''}
                                        invalid={errs.pass!==''}
                                        value={this.state.pass}
                                        onBlur={this.handleTouch('pass')}
                                        onChange={this.handleChange}>
                                    </Input>
                                    <FormFeedback>{errs.pass}</FormFeedback>
                                </FormGroup>

                                <FormGroup row>
                                    <div className="ml-auto mr-auto col-auto">
                                        <Button type="submit" color="primary" outline >Signup</Button>
                                    </div>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );     
    }
}

export default Signup;