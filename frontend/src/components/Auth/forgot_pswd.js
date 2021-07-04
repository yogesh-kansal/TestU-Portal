import React, { Component } from 'react';
import {Input,FormFeedback} from 'reactstrap';
import axios from 'axios';
import LoadingSpinner from '../loadingSpinner';
import {baseUrl} from '../../assets/config';
import './style.css'

class ForgotPswd extends Component {
    state={
        pass:'',
        c_pass:'',
        touched:{
            pass:false,
            c_pass:false
        }
    }

    validate(pass,c_pass) {
        const errs={pass:'', c_pass:''};
        if(this.state.touched.pass && pass.length<6)
            errs.pass='Password must be atleast of lenght 6';
        if(this.state.touched.c_pass && pass!==c_pass)
            errs.c_pass='password does not mathch';
        return errs;
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

    handleSubmit=(e) => {
        e.preventDefault();
        this.setState({
            isLoading_pass:true
        })

        let params= new URLSearchParams(this.props.location.search)
        let token=params.get('token');
        console.log(token)

        axios.patch(baseUrl+`/user/change_password`,{
            token,
            password:this.state.c_pass
        })
        .then(res => {
            this.setState({
                isLoading_pass:false
            })
            alert(res.data);
            this.props.history.push('/login');
        })
        .catch(err => {
            this.setState({
                isLoading_pass:false
            })
            alert(err.response.data);
        });
    }

    render() {
        const errs=this.validate(this.state.pass, this.state.c_pass);

        return (
            <div className="container forgot">
                <div className="row justify-content-center">
                    <div className="col-10 col-md-9">
                        {this.state.isLoading_pass
                            ?
                                <LoadingSpinner/>
                            :
                                <form onSubmit={this.handleSubmit}>
                                    <div className="row mb-3 px-3">
                                        <label htmlFor="pass" className="form-label col-12 col-md-3">New Password</label>
                                        <div className="col-10 col-md-6">
                                            <Input type="text" id="pass" className="col-6"
                                                value={this.state.pass}
                                                valid={errs.pass===''}
                                                invalid={errs.pass!==''}
                                                onBlur={this.handleTouch('pass')}
                                                onChange={this.handleChange}/>   
                                            <FormFeedback>{errs.pass}</FormFeedback>
                                        </div>
                                    </div>

                                    <div className="row mb-3 px-3">
                                        <label htmlFor="c_pass" className="form-label col-12 col-md-3">Confirm Password</label>
                                        <div className="col-10 col-md-6">
                                            <Input type="password" id="c_pass" className="col-6"
                                                value={this.state.c_pass}
                                                valid={errs.c_pass===''}
                                                invalid={errs.c_pass!==''}
                                                onBlur={this.handleTouch('c_pass')}
                                                onChange={this.handleChange}/>
                                            <FormFeedback>{errs.c_pass}</FormFeedback>
                                            </div>
                                    </div>

                                    <div className="row mt-4 justify-content-center">
                                        <button className="btn btn-primary col-8 col-md-4" type="submit">Reset Password</button>
                                    </div>
                                </form>
                        }                
                    </div> 
                </div>    
            </div>
        );
    }
}

export default ForgotPswd;

  