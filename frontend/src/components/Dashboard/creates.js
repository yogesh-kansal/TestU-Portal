import React, { Component } from 'react';
import {Link} from 'react-router-dom';
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
                <div key={id} className="col-12 col-md-9 col-sm-10 mb-5">
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
                                    <span className="col-auto ms-1 badge rounded-pill bg-warning">marks:{item.test.total}</span>
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

class Creates extends Component {
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

        user.createdList.forEach( item => {
            axios.get(baseUrl+'/test/'+item,{
                headers: {
                    'Authorization': 'Bearer '+this.context.jwtToken
                }
            })
            .then(res => {
                this.setState({
                    data:[...this.state.data,{
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
        //console.log(this.props);
        return (
            <div className="container style">
                <div className="row align-itmes-center">
                    <div className="col-auto ms-3">
                        <strong className="display-6">Creates</strong> 
                        <hr></hr>
                    </div>
                    <div className="col-auto ms-auto me-5">
                        <Link to="/test/new">
                            <button className="btn btn-primary">Create New Quiz</button>
                        </Link>
                    </div>
                </div>

                <div className="row justify-content-center">
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

export default Creates;