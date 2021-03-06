import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../dash_style.css';
import {testContext} from '../../../contexts/testContext';
import { baseUrl } from '../../../assets/config';
import axios from 'axios';
import LoadingSpinner from '../../loadingSpinner';
import DurationPicker from 'react-duration-picker'

class NewTest extends Component {
    static contextType=testContext;
    
    state = {
        isLoading:false,
        name:'',
        description:'',
        users: [''],
        questions:[{
            statement:'',
            options:[''],
            correctOptions:'',
            marks:'marks'
        }],
        duration:{hous:0,minutes:0,seconds:0},
        deadline:''
    }

    Changedur = duration => {
        this.setState({
            duration:duration
        })
      };

    addUser=() => {
        this.setState({
            users: [...this.state.users,'']
        })
    }

    changeUser(e,index) {
        let { users }=this.state;
        users[index]=e.target.value;
        this.setState({
            users:users
        })
    } 

    addQuestion=()=> {
        let ques={
            statement:'',
            options:[''],
            correctOptions:'',
            marks:'marks'
        }
        this.setState({
            questions: [...this.state.questions,ques]
        })
    }
    
    changeQuestion(e,index) {
        let {questions} =this.state;
        questions[index]=e.target.value;
        this.setState({
            questions:questions
        })
    } 

    addOption (index) {
        let questions=[...this.state.questions];
      //  console.log(index,questions)
        let ques={...questions[index]};
        ques.options.push('');
        questions[index]=ques;
        this.setState({
            questions:questions
        })
    }

    changeOption (e,index,id) {
        let questions=[...this.state.questions];
        let ques={...questions[index]};
        ques.options[id]=e.target.value;
        questions[index]=ques;
        this.setState({
            questions:questions
        })
    }

    changeBasic (e,index,tmp) {
        let questions=[...this.state.questions];
        let ques={...questions[index]};
        if(tmp===1) ques.marks=e.target.value;
        else if(tmp===2) ques.statement=e.target.value;
        else ques.correctOptions=e.target.value;
        questions[index]=ques;
        this.setState({
            questions:questions
        })
    }

    handleChange =(e) => {
        console.log(e.target)
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit= (e) => {
        e.preventDefault();
        console.log(this.state);

        this.setState({
            isLoading:true
        })

        let {isLoading, ...data}=this.state;

        data.questions.forEach((ques,id) => {
            data.questions[id].correctOptions=ques.correctOptions.split(' ').map(x =>parseInt(x,10));
        });

        console.log(data);

        axios.post(baseUrl+`/test/new`, this.state, {
            headers: {
                'Authorization': 'Bearer '+this.context.accesstoken
            }
        })
        .then(res => {
            this.context.Emit(this.state.users);
            this.setState({
                isLoading:false,
                name:'',
                description:'',
                users: [''],
                questions:[{
                    statement:'',
                    options:[''],
                    correctOptions:'',
                    marks:'marks'
                }],
                duration:'',
                deadline:''
            })
           // console.log(res.data);
            alert(res.data.status);
            this.context.refreshCreatedList();
            this.props.history.push('/creates')
        })
        .catch(err => {
            this.setState({
                isLoading:false,
                name:'',
                description:'',
                users: [''],
                questions:[{
                    statement:'',
                    options:[''],
                    correctOptions:'',
                    marks:'marks'
                }],
                duration:'',
                deadline:''
            })
            console.log(err.response);
            if(err.response)
            alert(err.response.data)
                else
            alert(err.message)
        });
    }

    render() {
        return (

            <div className="container style mt-5">                
                <div className="row align-items-center">
                    <div className="col-auto">
                        <p className="fs-3">Create New</p>
                        <hr/>
                    </div>

                    <div className="col-auto ms-auto me-5 mb-3">
                        <button className="btn btn-outline-primary" onClick={this.handleSubmit}>Create</button>
                        <Link to="/Creates">
                            <button className="btn btn-outline-danger ms-2">Back</button>
                        </Link>
                        
                    </div>
                </div>
                {this.state.isLoading
                ?
                    <LoadingSpinner/>
                :
                    <div className="row mt-4 ">
                        <div className="col-12 col-md-10">
                            <form onSubmit={this.handleSubmit}>
                            <div className="row mb-2">
                                    <div className="col-auto fs-4">
                                    <i className="bi bi-award-fill"></i>
                                        Info. Sections 
                                        <hr></hr>
                                    </div>
                                </div>
                                <div className="row form-group ms-1 me-1 mt-2">
                                    <div className="col-10 col-md-5">
                                        <div className="row">
                                            <label htmlFor="name" className="form-label col-2">Name</label>
                                            <input type="text" id="name" className="form-control col-6"
                                                value={this.state.name}
                                                onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <div className="col-10 col-md-5 ms-md-auto mt-2">
                                        <div className="row form-group">
                                            <label htmlFor="description" className="form-label col-3">Description</label>
                                            <input type="text" id="description" className="form-control col-9" row="2"
                                                value={this.state.description}
                                                onChange={this.handleChange}/>
                                        </div>
                                    </div>

                                    <div className="col-10 col-md-5 mt-2">
                                        <div className="row">
                                            <label htmlFor="duration" className="form-label col-3">Duration</label>
                                            <DurationPicker
                                                onChange={this.Changedur}
                                                className="col-6" 
                                                initialDuration={{ hours: 0, minutes: 0, seconds: 0 }}
                                                maxHours={3}
                                                />
                                        </div>
                                    </div>
                                    <div className="col-10 col-md-5 ms-md-auto mt-2">
                                        <div className="row form-group">
                                            <label htmlFor="deadleine" className="form-label col-3">Deadline</label>
                                            <input type="date" id="deadline" className="form-control col-9" row="2"
                                                value={this.state.deadline}
                                                onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="m-5 row justify-content-center">
                                    <hr className="col-6"></hr>
                                </div>

                                <div className="row mt-2">
                                    <div className="col-auto fs-4">
                                        User Section
                                        <hr></hr>
                                    </div>

                                    <div className="col-auto mt-2">
                                    <button type="button" className="ms-auto btn btn-secondary" onClick={this.addUser}>
                                        <span className="fa fa-plus fa-lg"></span> Add User</button>
                                    </div>
                                </div>

                                <div className="row form-group">
                                    {this.state.users.map((user,index) => {
                                        return (
                                        <div key={index} className="col-6 col-sm-4 col-md-3 mt-2">
                                            <label className="form-label">User {index+1}.</label>
                                            <input type="email" className="form-control"
                                                value={user}
                                                onChange={e => this.changeUser(e,index)}/>
                                        </div>
                                    )})}
                                </div>

                                <div className="m-5 row justify-content-center">
                                    <hr className="col-6"></hr>
                                </div>

                                <div className="row mt-2">
                                    <div className="col-auto fs-4">
                                        Ques. Section
                                        <hr></hr>
                                    </div>

                                    <div className="col-auto mt-2">
                                    <button type="button" className="ms-auto btn btn-secondary" onClick={this.addQuestion}>
                                        <span className="fa fa-plus fa-lg"></span> Add Ques.</button>
                                    </div>
                                </div>

                                <div className="row mt-4 justify-content-center">
                                    {this.state.questions.map((ques,index) => {
                                        return (
                                        <div key={index} className="col-11 col-md-9 mx-1 ques my-3 px-5 pt-5">
                                        
                                            <div className="row mt-4">
                                                <div className="col-auto">Q {index+1}.<hr></hr></div>
                                                    <div className="col-auto ms-auto me-3">
                                                        <input type="number" id="marks" className="form-control" placeholder="marks"
                                                            value={ques.marks}
                                                            onChange={e =>this.changeBasic(e,index,1)}/></div>
                                            </div>
            
                                            <div className="row justify-content-center mt-3">
                                                <label htmlFor="statement" className="col-12 form-label">Statement</label>
                                                <div className="col">
                                                    <textarea id="statement" rows="1" cols="50" className="form-control"
                                                        value={ques.statement}
                                                        onChange={e =>this.changeBasic(e,index,2)}/>
                                                    </div>
                                            </div>
                                           

                                            <div className="row mt-5">
                                                <div className="col-auto fs-5">Options<hr></hr></div>
                                                <div className="col-auto">
                                                    <button type="button" className="btn btn-secondary ms-auto mt-1" onClick={()=>this.addOption(index)}>
                                                        <span className="fa fa-plus fa-lg"></span></button>
                                                </div>
                                            </div>

                                            <div className="row">
                                                {ques.options.map((option,id) => {
                                                    return(
                                                        <div key={id} className="col-6 col-sm-4 col-md-3 mt-2">
                                                            <label className="form-label">Option {id+1}.</label>
                                                            <input type="text" className="form-control"
                                                            value={option}
                                                            onChange={e => this.changeOption(e,index,id)}/>
                                                        </div>
                                                    )})}
                                            </div>
                                           

                                            <div className="row mt-5">
                                                <div className="col-4 fs-5">Correct options</div>
                                                <div className="col-8 col-md-7">
                                                    <input type="text" className="form-control col-8 col-md-6" id="correctOptions"
                                                        value={ques.correctOptions}
                                                        onChange={e =>this.changeBasic(e,index,3)}/>
                                                    
                                                <p className="text-center text-warning mt-2">(Enter space seperated option number which are correct)</p>
                                                </div>
                                            </div>
                                        </div>
                                    )})}
                                </div>
                            </form>
                        </div> 
                    </div>
                }
            </div>
            
        );
    }
}

export default NewTest;


/**
 * 
 */