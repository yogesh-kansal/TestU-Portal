import React, { Component } from 'react';
import {Card, CardHeader, CardBody, Button } from 'reactstrap';
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
            //console.log(item,id);
            return(
                <div key={id} className="col-11 mb-2">
                    <Card>
                        <CardHeader>
                            <div className="row">
                                <div className="col-auto me-auto">
                                    {item.test.name}
                                </div>
                                <div className="col-auto ml-auto">
                                    <Button color="secondary" onClick={() => {
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
                    <div className="col-10 col-md-8">
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
                                <div className="col-8">
                                    <img  className="col-auto img-fluid" src={img} alt="notfound" /> 
                                </div>
                            </div>
                                   
                    }
                    </div>
                </div>
            </div>
        );
    }
}

export default Creates;