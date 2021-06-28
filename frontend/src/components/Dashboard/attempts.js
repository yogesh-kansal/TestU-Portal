import React, { Component } from 'react';
import {Card, CardHeader, CardBody, Button } from 'reactstrap';
import {authContext} from '../../contexts/authContext';
import { baseUrl } from '../../assets/config';
import axios from 'axios';
import LoadingSpinner from '../loadingSpinner';
import './dash_style.css';
import img from '../../assets/not-found.png';


const Render =(props) => {
    return (
        props.data.map((item,id) => {
            return(
                <div key={id} className="col-12 col-md-9 col-sm-10 mb-25">
                    <div className="card">
                            <div className="card-header border-0">
                                <div className="row align-items-center">
                                    <h4 className="col-auto">{item.test.name}</h4>
                                    <div className="d-none d-sm-block col-auto ms-auto">
                                        <button type="button" className="btn btn-secondary" onClick={() => {
                                        props.modifyData(item)
                                        props.history.push(`/test/view/${item.test._id}`)
                                    }}>view</button>
                                    </div>
                                </div>
                                <div className="row mt-1">
                                    <span className="col-auto ms-1 badge rounded-pill bg-warning">marks:{item.marks_obt}/{item.test.total}</span>
                                    <span className="col-auto ms-1 badge rounded-pill bg-info">time:{item.test.duration} hr</span>
                                    <span className="col-auto ms-1 badge rounded-pill bg-danger">dl.:{item.test.deadline}</span>       
                                </div>
                            </div>
                            <div className="row align-items-center card-body">
                                <div className="col-11">
                                    <div className="row">{item.test.description}</div>
                                    <div className="row d-block d-sm-none mx-5 mt-2">
                                            <button type="button" className="btn btn-block btn-secondary" onClick={() => {
                                            props.modifyData(item)
                                            props.history.push(`/test/view/${item.test._id}`)
                                        }}>view</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            );
        })
    );
}


class Attempts extends Component {
    static contextType=authContext;
    state = {
        isLoading:true,
        data:[]
    }

    componentDidMount() {
        let {user} =this.context;

        if(user.availableList.length===0)
        {
            this.setState({
                isLoading:false
            })
        }

          user.takenList.forEach( item => {
            axios.get(baseUrl+'/test/'+item.id,{
                headers: {
                    'Authorization': 'basic '+this.context.jwtToken
                }
            })
            .then(res => {
                this.setState({
                    data:[...this.state.data,{
                        answers:item.answers || null,
                        marks_obt:item.marks_obt || 0,
                        test: res.data
                    }],
                    isLoading:false
                })
            })
            .catch(err => {
                this.setState({
                    isLoading:false
                })

                if(err.response)
                    alert(err.response.data)
                else
                    alert(err.message)
            });
        });
    }
    render() {
        return (
            <div className="container style">
                <div className="row">
                    <div className="col-auto">
                        <strong className="display-6">Attempted</strong>
                        <hr></hr>
                    </div>
                </div>

                <div className="row  justify-content-center">
                    {
                        this.state.isLoading
                        ?
                            <LoadingSpinner/>
                        :
                            this.state.data.length
                            ?
                                <Render data={this.state.data} history={this.props.history} modifyData={this.context.modifyData}/>
                            :
                            <div className="row justify-content-center">
                                <div className="col-6">
                                    <img  className="col-auto img-fluid" src={img} alt="notfound" /> 
                                </div>
                            </div>
                    }
                </div>
            </div>
        );
    }
}

export default Attempts;


/**
 * /*{
            test:{
                    author:"60a80c6bc928253054a54515",
                    name:"Sorting quiz",
                    description:"This is a quiz cosisting of data-structurs and algorithms.",
                    questions:[
                    {
                        statement:"What is time complexity of quicksort?",
                        options:["O(N)","O(N^2)","O(Nlog(N))","O(1)"],
                        correctOptions:["O(Nlog(N))"],
                        maxMarks:20
                    },
                    {
                        statement:"What is time complexity of mergesort?",
                        options:["O(N)","O(N^2)","O(Nlog(N))","O(1)"],
                        correctOptions:["O(Nlog(N))"],
                        maxMarks:20
                    },
                    {
                        statement:"What is time complexity of bucketsort?",
                        options:["O(N)","O(N^2)","O(Nlog(N))","O(1)"],
                        correctOptions:["O(Nlog(N))"],
                        maxMarks:20
                    }]
                }
            }*/