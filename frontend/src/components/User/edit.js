import React, { Component } from 'react';
import {Input} from 'reactstrap';
import { Link } from 'react-router-dom';
import {authContext} from '../../contexts/authContext';
import './style.css'
import axios from 'axios';
import {baseUrl} from '../../assets/config';
import LoadingSpinner from '../loadingSpinner';

class Edit extends Component {
    static contextType=authContext;
    state = {
        new_name: '',
        emailId: '',
        new_institute: '',
        old_pass: '',
        new_pass: '',
        touched: {
            user: false,
            ins: false,
            pass:false
        },
        isLoading_info:false,
        isLoading_pass:false
    }

    componentDidMount() {
        let {user} = this.context;
        this.setState({
            emailId:user.emailId,
            new_name:user.username,
            new_institute:user.institute
        })
    }

    validate(user,ins,pass) {
        const err ={
            user: '',
            ins: '',
            pass:''
        }
        if(this.state.touched.user && user.length<3)
            err.user='usernmae must be atleat of lenght 3';
        else if(this.state.touched.pass && user.length>8)
            err.user='username must be atmax of lenght 8';
        if(this.state.touched.ins && ins.length===0)
            err.ins='Addess must be non-empty';
        if(this.state.touched.pass && pass.length<6)
            err.pass='Password must be atleast of lenght 6';
        return err;
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

    updateUserInfo=(e) => {
        this.setState({
            isLoading_info:true
        })
        e.preventDefault();
        let {user}= this.context;

        let data={};
        if(this.state.new_name!==user.username)
            data.username=this.state.new_name;
        if(this.state.new_institute!==user.institute)
                data.institute=this.state.new_institute;
        console.log(data);

        axios.patch(baseUrl+`/user/edit/${user._id}`, data, {
            headers: {
                'Authorization': 'Bearer '+this.context.accesstoken
            }
        })
        .then(res => {
            this.setState({
                isLoading_info:false
            })
            alert(res.data.status);
            this.context.modifyInfo(res.data.user);
        })
        .catch(err => {
            this.setState({
                isLoading_info:false
            })
            console.log(err.response);
            alert(err.response.data);
        });
    }

    resetPassword=(e) => {
        e.preventDefault();
        this.setState({
            isLoading_pass:true
        })

        let data={
            old:this.state.old_pass,
            new:this.state.new_pass
        }

        axios.patch(baseUrl+`/user/reset_password/${this.context.user._id}`, data, {
            headers: {
                'Authorization': 'Bearer '+this.context.accesstoken
            }
        })
        .then(res => {
            this.setState({
                old_pass:'',
                new_pass:'',
                isLoading_pass:false
            })
            alert(res.data);
        })
        .catch(err => {
            this.setState({
                old_pass:'',
                new_pass:'',
                isLoading_pass:false
            })
            console.log(err.response);
            alert(err.response.data);
        });
    }
    
    render() {
        let errs=this.validate(this.state.new_name,this.state.new_institute,this.state.new_pass);

        return (
            <div className="container mt-5 pt-1 user">
                <div className="row justify-content-center">
                    <div className="col-10 col-md-9">
                        <div className="card">
                            <div className="card-header border-0 bg-info text-white">
                                <div className="row align-items-center">
                                    <h4 className="col-auto ms-2">Edit profile</h4>

                                    <div className="col-auto ms-auto me-3">
                                        <Link to={`/user`}>
                                            <button className="btn btn-outline-light">Back</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row mt-2">
                                    <div className="col-auto">
                                        <strong>Edit Basic Info.</strong>
                                        <hr></hr>
                                    </div> 
                                </div>

                                <div className="row p-md-2">
                                    <div className="col-12 col-md-7">

                                        {this.state.isLoading_info
                                        ?
                                            <LoadingSpinner/>
                                        :
                                            <form onSubmit={this.updateUserInfo}>
                                                <div className="row mb-3 px-3">
                                                    <label htmlFor="new_email" className="form-label col-12 col-sm-6">Email</label>
                                                    <Input type="email" className="col-12 col-md-7" readOnly value={this.state.emailId} valid={true}/>
                                                </div>
                                                
                                                <div className="row mb-3 px-3">
                                                    <label htmlFor="new_username" className="form-label col-12 col-sm-6">Username</label>
                                                    <Input type="text" id="new_name" className="col-12 col-md-7"
                                                        valid={errs.user===''}
                                                        invalid={errs.user!==''}
                                                        value={this.state.new_name}
                                                        onBlur={this.handleTouch('user')}
                                                        onChange={this.handleChange}/>
                                                </div>

                                                <div className="row mb-3 px-3">
                                                    <label htmlFor="cnew_add" className="form-label col-12 col-sm-6">Institute</label>
                                                    <Input type="text" id="new_institute" className="col-12 col-md-7"
                                                        valid={errs.ins===''}
                                                        invalid={errs.ins!==''}
                                                        value={this.state.new_institute}
                                                        onBlur={this.handleTouch('ins')}
                                                        onChange={this.handleChange}/>
                                                </div>

                                                <div className="row mb-5 px-3 justify-content-center">
                                                    <div className="col-12 col-md-6">
                                                        <button className="btn btn-outline-primary" type="submit">Edit Info.</button>
                                                    </div>
                                                </div>
                                            </form>
                                        }
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-auto">
                                        <strong>Reset Password</strong>
                                        <hr></hr>
                                    </div> 
                                </div>

                                <div className="row p-md-2">
                                    <div className="col-12 col-md-7">
                                        {this.state.isLoading_pass
                                        ?
                                            <LoadingSpinner/>
                                        :
                                            <form onSubmit={this.resetPassword}>
                                                <div className="row mb-3 px-3">
                                                    <label htmlFor="old_pass" className="form-label col-12 col-sm-8">Old Password</label>
                                                    <Input type="password" id="old_pass" className="col-12 col-md-7"
                                                        value={this.state.old_pass}
                                                        valid={true}
                                                        onChange={this.handleChange}/>
                                                </div>

                                                <div className="row mb-3 px-3">
                                                    <label htmlFor="new_pass" className="form-label col-12 col-sm-8">New Password</label>
                                                    <Input type="password" id="new_pass" className="col-12 col-md-6"
                                                        value={this.state.new_pass}
                                                        valid={errs.pass===''}
                                                        invalid={errs.pass!==''}
                                                        onChange={this.handleChange}/>
                                                </div>

                                                <div className="row mb-4 px-3 justify-content-center">
                                                    <div className="col-12 col-sm-8">
                                                        <button className="btn btn-outline-primary" type="submit">Reset Password</button>
                                                    </div>
                                                </div>
                                            </form>
                                        }
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

export default Edit;