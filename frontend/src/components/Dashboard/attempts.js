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
           // console.log(item,id);
            return(
                <div key={id} className="col-12 mb-2">
                    <Card>
                        <CardHeader>
                            <div className="row">
                                <div className="col-auto mr-auto">
                                    {item.test.name}
                                </div>
                                <div className="col-auto ml-auto">
                                <Button color="secondary" onClick={()=> {
                                        props.modifyData(item)
                                        props.history.push(`/test/view/${item.test._id}`)
                                    }}>view</Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody>
                            {item.test.description}
                        </CardBody>
                    </Card>
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
                        marks:item.totalMarks || null,
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
                        <strong>Attempted</strong>
                        <hr></hr>
                    </div>
                </div>

                <div className="row  justify-content-center">
                    <div className="col-10">
                    {
                        this.state.isLoading
                        ?
                            <LoadingSpinner/>
                        :
                            this.state.data.length
                            ?
                                <Render data={this.state.data} history={this.props.history} modifyData={this.context.modifyData}/>
                            :
                                <img  className="not-found" src={img} alt="notfound" />
                    }
                    </div>
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