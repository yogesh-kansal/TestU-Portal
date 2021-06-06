import  { Component } from 'react';
import {Form, FormGroup, Label, Input,Button, FormFeedback} from 'reactstrap';
import './style.css'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state= {
            email: '',
            password: '',
            touched: {
                email: false,
                pass: false
            }
        }
    }

    handleChange=(e) => {
        this.setState({
            [e.target.id]:e.target.value
        });
    }

    handleSubmit=(e) => {
        e.preventDefault();
        console.log(this.state);

        alert("your data has been sent successfully"+JSON.stringify(this.state));
    }

    //for touchng th box
    handleTouch =(feild) =>(e) => {
        this.setState({
            touched: {...this.state.touched, [feild]:true}
        });
    }

    //validating the form
    validate(email,pass) {
        const err ={
            email:'',
            pass:''
        }
        let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if(this.state.touched.email && !mailformat.test(email))
            err.email='Mail format is not correct';
        if(this.state.touched.pass && pass.length<6)
            err.pass='Password must be atleat of lenght 6';
        return err;
    }

    render() {
        let errs=this.validate(this.state.email,this.state.password);

        return (
            <div className="form_style">
                <div className="container">
                    <div className="row">
                        <div className="col-auto style">
                            <h3>Log In</h3>
                            <hr></hr>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-8">
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup row>
                                    <Label htmlFor="email" className="style col-12 col-sm-6">Email Id</Label>
                                    <Input type="email" id="email" className="col-12 col-sm-9" 
                                        placeholder="Enter User Email Id..."
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
                                        placeholder="Enter Your Password..."
                                        valid={errs.pass===''}
                                        invalid={errs.pass!==''}
                                        value={this.state.password}
                                        onBlur={this.handleTouch('pass')}
                                        onChange={this.handleChange}>
                                    </Input>
                                    <FormFeedback>{errs.pass}</FormFeedback>
                                </FormGroup>

                                <FormGroup row>
                                    <div className="col-7 ml-auto mr-auto col-auto">
                                        <Button type="submit" color="primary" outline>login</Button>
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

export default Login;
