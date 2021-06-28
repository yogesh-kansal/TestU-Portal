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
                                <Button color="secondary" onClick={() => {
                                        props.modifyData(item)
                                        props.history.push(`/test/take/${item.test._id}`)
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
                        <strong>Welcome to Quiz-n-trivia!!!</strong>
                    </div>
                </div>

                <div className="row">
                    <div className="col-7">
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <strong>Availables</strong>
                                <hr/>
                            </div>
                        </div>

                        <div className="row">
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

                    <div className="col-5">
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <strong>Notifications</strong>
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