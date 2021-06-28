import React, { Component } from 'react';
import { Button, Form, Label, Input } from 'reactstrap';
import { authContext } from '../../../contexts/authContext';
import Timer from './stopWatch';
import './test_style.css';

class TakeTest extends Component {
    static contextType=authContext;
    state = {
        isStarted: false,
        time :'2',
        author:'admin',
        questions:[{statement:'who are you? and where are you from?',options:['akash','yogesh','ram','shyam']},
        {statement:'who are you?',options:['akash','yogesh','ram','shyam']},
        {statement:'who are you?',options:['akash','yogesh','ram','shyam']}]
    }

    componentDidMount() {
        this.setState({
            questions:this.context.data.questions
        })
    }

    isTimeup() {
        alert("time ot end the quiz");
    }
    
    render() {
        let {isStarted,time,author} =this.state;
        if(!isStarted)
            return(
                <div className="container before">
                    <div className="row text-center justify-content-center">
                        <div className="col-6">
                            <p>Welcome to your new quiz<br/></p>
                            <p>You are going to attempt the quiz<br/>
                             which is {time} hours of time duration<br/>
                             And created by {author}.</p>

                            <Button color='primary' outline 
                                onClick={()=>{this.setState({isStarted:true})}}
                              >Start</Button>
                        </div>
                    </div>
                </div>
            );
        else 
            return(
                <div className="container after">
                    <div className="row text-center">
                        <div className="col-auto ml-auto mr-auto">
                            <p>Quiz has been started!!!<br></br>
                            You can end the quiz before time also.</p>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Form>
                                <div className="row mb-5">
                                    <div className="col-auto">
                                        <Button type="submit" className="submit">Submit Quiz</Button>
                                    </div>
                                    <div className="col-auto ml-auto mr-5">
                                        {<Timer timeUp={this.isTimeup}/>}
                                    </div>
                                </div>

                                <div className="row justify-content-center">
                                    {this.state.questions.map((ques,index) => {
                                        return(
                                            <div key={index} className="col-10">
                                                <div className="row mb-2">
                                                    <div className="col-auto">
                                                    {`Q ${index+1}.`} {ques.statement}
                                                    </div>
                                                </div>

                                                <div className="row mb-5 pt-2 pl-5">                                                
                                                    {ques.options.map((option,id) => {
                                                        return(
                                                            <div key={id} className="col-12 col-md-5 ml-auto mr-auto mb-2">
                                                                <Label check><Input type="radio" className="mt-3" name="radio1"/>{' '}
                                                                    {option}</Label>
                                                            </div>
                                                        )})} 
                                                </div>
                                            </div>
                                        )})}
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            );   
    }
}

export default TakeTest;