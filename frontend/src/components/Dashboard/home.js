import React, { Component } from 'react';
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
                <div key={id} className="col-12 col-md-9 col-sm-10 mb-25 mx-5">
                    <div className="card">
                            <div className="card-header border-0">
                                <div className="row align-items-center">
                                    <h4 className="col-auto">{item.test.name}</h4>
                                    <div className="col-auto ms-auto">
                                        <button type="button" className="btn btn-secondary" onClick={() => {
                                        props.modifyData(item)
                                        props.history.push(`/test/take/${item.test._id}`)
                                    }}>view</button>
                                    </div>
                                </div>
                                <div className="row mt-1">
                                    <span className="col-auto ms-1 badge rounded-pill bg-info">time:{item.test.duration} hr</span>
                                    <span className="col-auto ms-1 badge rounded-pill bg-danger">dl.:{item.test.deadline}</span>       
                                </div>
                            </div>
                            <div className="row align-items-center card-body">
                                <div className="col-11">
                                    <div className="row">{item.test.description}</div>
                                </div>
                            </div>
                        </div>
                </div>
            );
        })
    );
}

class Home extends Component {
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

          user.availableList.forEach( item => {
            axios.get(baseUrl+'/test/'+item,{
                headers: {
                    'Authorization': 'basic '+this.context.jwtToken
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
                    alert(err.message)});
        });
    }

    render() {
        //const list=[{id:1,name:"yogesh"},{id:2,name:"yogesh"},{id:3,name:"yogesh"}];
        return (
            <div className="container style">
                <div className="row justify-content-center mb-4">
                    <div className="col-auto">
                        <strong className="display-5 d-none">Welcome to Exam Portal!!!</strong>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-8">
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <strong className="display-6">Availables</strong>
                                <hr/>
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

                    <div className="col-4 d-none d-md-block">
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <strong className="display-6">Notifications</strong>
                                <hr/>
                            </div>
                        </div>

                        <div className="row">

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;