import React, { Component } from 'react';
import {Input,FormFeedback} from 'reactstrap';
import './style.css'
import axios from 'axios';
import {baseUrl} from '../../assets/config';

class Signup extends Component {
    state= {
        email: '',
        username: '',
        password: '',
        institute:'',
        touched: {
            user:false,
            email: false,
            pass: false,
            institute: false
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

        let {email,username,password,institute}=this.state;

        let data={
            emailId:email,
            username,password,institute
        }

        axios.post(baseUrl+'/user/signup',data)
        .then(res => {
            console.log(res);
            this.props.history.push('/login');
        })
        .catch(err => {
            console.log(err.response);
            alert(err.response.data);

        });
    }

    render() {
        let errs=this.validate(this.state.username, this.state.email,this.state.password);

        return (
                <div className="container my-5">
                    <div className="row justify-content-center">
                        <div className="col-11 col-lg-4 col-md-7 col-sm-9">
                            <form onSubmit={this.handleSubmit} className="signup">

                                <div className="row justify-content-center mt-1">
                                    <div className="col-auto heading label">
                                        <h3>Sign Up</h3>
                                            <hr></hr>
                                    </div>
                                </div>
                                
                                <div className="row mb-3 px-3">
                                    <label htmlFor="username" className="form-label label col-12 col-md-6">Username</label>
                                    <Input type="text" id="username" className="col-11 col-md-7" 
                                        placeholder="Your choice..."
                                        valid={errs.user===''}
                                        invalid={errs.user!==''}
                                        value={this.state.username}
                                        onBlur={this.handleTouch('user')}
                                        onChange={this.handleChange}>
                                    </Input>                                    
                                    <FormFeedback>{errs.user}</FormFeedback>
                                </div>

                                <div className="row mb-3  px-3">
                                    <label htmlFor="email" className="form-label label col-12 col-md-6">Email Id</label>
                                    <Input type="email" id="email" className="col-12 col-md-9" 
                                        placeholder="User Email Id..."
                                        valid={errs.email===''}
                                        invalid={errs.email!==''}
                                        value={this.state.email}
                                        onBlur={this.handleTouch('email')}
                                        onChange={this.handleChange}>
                                    </Input>
                                    <FormFeedback>{errs.email}</FormFeedback>
                                </div>

                                <div className="row mb-3  px-3">
                                    <label htmlFor="password" className="form-label label col-12 col-md-6">Password</label>
                                    <Input type="password" id="password"  className="col-12 col-md-9" 
                                        placeholder="Your Password..."
                                        valid={errs.pass===''}
                                        invalid={errs.pass!==''}
                                        value={this.state.pass}
                                        onBlur={this.handleTouch('pass')}
                                        onChange={this.handleChange}>
                                    </Input>
                                    <FormFeedback>{errs.pass}</FormFeedback>
                                </div>

                                <div className="row mb-3  px-3">
                                    <label htmlFor="institute" className="form-label label col-12 col-md-6">Institute</label>
                                    <Input type="text" id="institute" className="col-12 col-md-9" 
                                        placeholder="Your choice..."
                                        valid={true}
                                        value={this.state.institute}
                                        onBlur={this.handleTouch('institute')}
                                        onChange={this.handleChange}>
                                    </Input>                                   
                                </div>

                                <div className="row justify-content-center mb-1">
                                    <div className="ml-auto mr-auto col-auto">
                                        <button type="submit" className="btn btn-outline-primary ">Signup</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        );     
    }
}

export default Signup;