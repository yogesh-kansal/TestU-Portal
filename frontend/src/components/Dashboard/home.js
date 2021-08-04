import React, { Component } from 'react';
import {testContext} from '../../contexts/testContext';
import LoadingSpinner from '../loadingSpinner';
import './dash_style.css';
import img from '../../assets/not-found.png';


const Render =(props) => {
    return (
        props.data.map((item,id) => {
            let {hours,minutes,seconds}=item.test.duration;
            return(
                <div key={id} className="col-12 col-md-9 col-sm-10 mb-5 mx-5">
                    <div className="card">
                            <div className="card-header border-0">
                                <div className="row align-items-center">
                                    <h4 className="col-auto">{item.test.name}</h4>
                                    <div className="col-auto ms-auto">
                                        <button type="button" className="btn btn-secondary" onClick={() => {
                                        props.history.push(`/test/take/${id}`)
                                    }}>Attempt</button>
                                    </div>
                                </div>
                                <div className="row mt-1">
                                    <span className="col-auto ms-1 badge rounded-pill bg-info">time:{hours}h {minutes}m {seconds}s</span>
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
    static contextType=testContext;

    componentDidMount() {
        let {availData}=this.context;
        if(!availData)
            this.context.refreshAvailList();
    }

    render() {
        const data=this.context.availData, isLoading=this.context.avail_loading;

        return (
            <div className="container-fluid style">
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
                            isLoading
                            ?
                                <LoadingSpinner/>
                            :
                                data && data.length
                                ?
                                    <Render data={data} history={this.props.history}/>
                                :
                                <div className="row justify-content-center">
                                    {
                                    this.context.avail_err ||
                                    <div className="col-auto mx-auto">
                                        <img  className="img-fluid" src={img} alt="notfound" width="400"/> 
                                        </div>
                                    }
                                </div>            
                        }
                        </div>
                    </div>

                    <div className="col-3 d-none d-md-block">
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <strong className="display-6">Notifications</strong>
                                <hr/>
                            </div>
                        </div>

                        <div className="notifications row p-2 align-items-center">
                            <div className="content mb-1">
                                Hii guys!!! 
                                Welcome to our portal...

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;