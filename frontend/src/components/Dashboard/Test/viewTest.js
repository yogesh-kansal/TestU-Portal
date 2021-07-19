import React, { Component } from 'react';
import { testContext } from '../../../contexts/testContext';
import {Link} from 'react-router-dom'
import LoadingSpinner from '../../loadingSpinner';

class ViewTest extends Component {
    static contextType=testContext;
    state = {
        test:null,
        answers:null,
        isCreator:false,
        index:0
    }
    

    componentDidMount() {
        let {type,id}=this.props.match.params;
        if(type==='c') {
            this.setState({
                test:this.context.createdData[id].test,
                isCreator:true
            })
        }
        else if(type==='t') {
            this.setState({
                test:this.context.takenData[id].test,
                answers:this.context.takenData[id].answers,
                isCreator:false
            })
        }
    }

    changeIndex(x) {
        this.setState({
            index:this.state.index+x
        })
    }

    render() {
        const {isCreator,index,test,answers}=this.state;
        console.log(isCreator,index,test,answers)

        if(test===null) {
            return (
                <LoadingSpinner/>
            );
        }
        else {
        return (
            <div className="container-fluid after">
                <div className="row mx-1">
                    <div className="col-12">
                        <form>
                            <div className="row test-nav">
                                    <div className="col-auto text-white">{test.name}<span className="fs-5">{'   (No. of ques.: '}{test.questions.length})</span></div>
                                    <div className="col-auto ms-auto">
                                        <Link to={this.props.match.params.type==='c'?"/creates":"/taken"}>
                                            <button type="button" className="btn btn-danger">Back</button>
                                        </Link>
                                    </div>                          
                            </div>

                            <div className="show">

                                <div className="row flex-item">
                                    <div className="col-4 left-panel px-2">
                                        <div className="row ms-1">
                                            <div className="col-auto">
                                                Question {index+1}.<hr></hr>
                                            </div>
                                            <div className="col-auto ms-auto me-2">
                                                marks: {test.questions[index].marks}
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
                                                            checked={!isCreator ?answers?answers[index].indexOf(id+1)>-1:false : false} disabled={false}>
                                                        </input>
                                                        <label className="form-check-label" for="">
                                                            {option}{' '}{test.questions[index].correctOptions.indexOf(id+1)>-1 ?
                                                                        <span className="fa fa-check green ng-star-inserted"></span>:<span></span>}
                                                        </label>
                                                    </div>
                                                )})} 
                                        </div>
                                    </div>
                                </div>

                                <div className="row justify-content-center test-bottom">
                                        <div className="me-1 col-auto">
                                            <button type="button" className="btn text-white prev" disabled={index===0} onClick={() =>this.changeIndex(-1)}>
                                                <img className="me-1 mb-1" src={'https://files.codingninjas.in/0000000000000690.png'} alt={'prev'}></img>Previous</button>
                                        </div> 
                                        <div className="ms-1 col-auto">
                                            <button type="button" className="btn text-white next" disabled={test.questions.length===index+1} onClick={() =>this.changeIndex(1)}>
                                                <img className="me-1 mb-1" src={'https://files.codingninjas.in/0000000000000689.png'} alt={'next'}></img>Next</button>
                                        </div>                            
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
        }
    }
}

export default ViewTest;