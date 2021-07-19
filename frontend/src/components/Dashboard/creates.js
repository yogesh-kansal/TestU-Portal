import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {testContext} from '../../contexts/testContext';
import LoadingSpinner from '../loadingSpinner';
import './dash_style.css';
import img from '../../assets/not-found.png';

const Render =(props) => {
    return (
        props.data.map((item,id) => {
            let {hours,minutes,seconds}=item.test.duration;
            return(
                <div key={id} className="col-12 col-md-9 col-sm-10 mb-5">
                    <div className="card">
                            <div className="card-header border-0">
                                <div className="row align-items-center">
                                    <h4 className="col-auto">{item.test.name}</h4>
                                    <div className="d-none d-sm-block col-auto ms-auto">
                                        <button type="button" className="btn btn-secondary" onClick={() => {
                                        props.history.push(`/test/c/view/${id}`)
                                    }}>view</button>
                                    </div>
                                </div>
                                <div className="row mt-1">
                                    <span className="col-auto ms-1 badge rounded-pill bg-warning">marks:{item.test.total}</span>
                                    <span className="col-auto ms-1 badge rounded-pill bg-info">time:{hours}h {minutes}m {seconds}s</span>
                                    <span className="col-auto ms-1 badge rounded-pill bg-danger">dl.:{item.test.deadline}</span>       
                                </div>
                            </div>
                            <div className="row align-items-center card-body">
                                <div className="col-11">
                                    <div className="row">{item.test.description}</div>
                                    <div className="row d-block d-sm-none mx-5 mt-2">
                                            <button type="button" className="btn btn-block btn-secondary" onClick={() => {
                                            props.history.push(`/test/c/view/${id}`)
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
    static contextType=testContext;

    componentDidMount() {
        let {createdData}=this.context;
        if(!createdData)
            this.context.refreshCreatedList()
    }
    
    render() {
        const data=this.context.createdData, isLoading=this.context.create_loading;
        return (
            <div className="container style">
                <div className="row align-itmes-center">
                    <div className="col-auto ms-3">
                        <strong className="display-6">Creates</strong> 
                        <hr></hr>
                    </div>
                    <div className="col-auto ms-auto me-5">
                        <Link to="/test/new">
                            <button className="btn btn-primary">Create New</button>
                        </Link>
                    </div>
                </div>

                <div className="row justify-content-center mt-3">
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
                                this.context.create_err ||
                                <div className="col-auto mx-auto">
                                    <img  className="img-fluid" src={img} alt="notfound" width="400"/> 
                                    </div>
                                }
                            </div>
                                   
                    }
                </div>
            </div>
        );
    }
}

export default Creates;