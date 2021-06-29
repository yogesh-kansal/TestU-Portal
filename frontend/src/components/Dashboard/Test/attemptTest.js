import React, { Component } from 'react';
import { Button, Form, Label, Input } from 'reactstrap';
import { authContext } from '../../../contexts/authContext';
import Timer from './stopWatch';
import './test_style.css';

class TakeTest extends Component {
    static contextType=authContext;
    constructor(props) {
        super(props);

        this.state = {
            isStarted: false,
            test:[],
            index:0
            
        }
        
    this.isTimeup=this.isTimeup.bind(this);
        
    }

    componentDidMount() {
         let answers=[];
        for(let ques of this.context.data.questions)
            answers.push(-1);
        
        this.setState({
            test:{...this.context.data,answers}
        })
    }

    changeIndex(x) {
        this.setState({
            index:this.state.index+x
        })
    }

    changeAns(index,id) {
        console.log(index,id);
        let {test}=this.state;
        let answers=[...test.answers];
        answers[index]=id;
        test.answers=answers;

        this.setState({
            test
        });
    }

    handleSubmit=(e) => {
        if(e)
            e.preventDefault();
        console.log(this.state);
        alert('Exam submiited successfully!!!');
    }

    isTimeup() {
        alert('Time is up\nTest will submit automatically!!!');
        this.handleSubmit();
    }
    
    render() {
        let {isStarted,test,index} =this.state;
        console.log(isStarted, index)
        if(!isStarted)
            return(
                <div className="container before">
                    <div className="row text-center justify-content-center">
                        <div className="col-10 col-md-6">
                            <p>You are going to attempt the test!!!</p>
                            <span className="d-block">Duration: {test.duration} hour</span>
                            <span className="d-block">Marks: {test.total}</span>
                            <span className="d-block">Wr. Email: {test.author}</span>
                            <div className="row mt-3 mx-5">
                                <button type="button" className="btn btn-block btn-primary"
                                    onClick={()=>{this.setState({isStarted:true})}}>START
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        else 
            return(
                <div className="container-fluid after">
                    <div className="row mx-1">
                        <div className="col-12">
                            <form onSubmit={this.handleSubmit}>
                                <div className="row test-nav">
                                        <div className="col-auto text-white">{test.name}</div>
                                        <div className="col-auto ms-auto">
                                            {<Timer time={test.duration} timeUp={this.isTimeup}/>}
                                        </div>
                                        <div className="ms-2 me-3 col-auto">
                                            <button type="submit" className="btn btn-danger fs-5 submit">
                                                <img className="me-1 mb-1" src={'https://files.codingninjas.in/0000000000000693.png'}></img>Submit</button>
                                        </div>                            
                                </div>

                                <div className="row">
                                    <div className="col-4 left-panel px-2">
                                        <div className="row ms-1">
                                            <div className="col-auto">
                                                Question {index+1}.<hr></hr>
                                            </div>
                                        </div>
                                        <div className="row mx-1">
                                            <div className="col-auto question">
                                                {test.questions[index].statement} 
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-8 right-panel px-4">
                                        <div className="row options">
                                            <div className="col-auto">
                                                Options<hr></hr>
                                            </div>
                                        </div>

                                        <div className="row mb-5 pt-2 px-5 options flow py-3">                                                
                                            {test.questions[index].options.map((option,id) => {
                                                return(
                                                    <div key={id} className="col-12 mb-2 form-check">
                                                        <input className="form-check-input" type="radio" 
                                                            checked={test.answers[index]===id}
                                                            onChange={(e) =>this.changeAns(index,id)}>
                                                        </input>
                                                        <label className="form-check-label" for="">
                                                            {option}
                                                        </label>
                                                    </div>
                                                )})} 
                                        </div>
                                    </div>
                                </div>

                                <div className="row justify-content-center test-bottom">
                                        <div className="me-1 col-auto">
                                            <button type="button" className="btn text-white prev" disabled={index==0} onClick={() =>this.changeIndex(-1)}>
                                                <img className="me-1 mb-1" src={'https://files.codingninjas.in/0000000000000690.png'}></img>Previous</button>
                                        </div> 
                                        <div className="ms-1 col-auto">
                                            <button type="button" className="btn text-white next" disabled={test.questions.length===index+1} onClick={() =>this.changeIndex(1)}>
                                                <img className="me-1 mb-1" src={'https://files.codingninjas.in/0000000000000689.png'}></img>Next</button>
                                        </div>                            
                                </div>

                                
                            </form>
                        </div>
                    </div>
                </div>
            );   
    }
}
console.log(Component)
export default TakeTest;
