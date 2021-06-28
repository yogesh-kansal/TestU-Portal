import React, { Component } from 'react';
import { authContext } from '../../../contexts/authContext';

class ViewTest extends Component {
    static contextType=authContext;
    state = {
        isCreator:false
    }

    componentDidMount() {
        let {user,data}=this.context;
        this.setState({
            isCreator:user._id===data.test.author
        })
    }

    render() {
        const {test,answers}=this.context.data, {isCreator}=this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-auto ml-auto">
                        Quiz
                    </div>
                    <div className="col-auto mr-auto">
                        {test.duration}
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        {
                            test.questions.map((ques,index) => {
                                <div key={index} className="row">
                                    <div className="col-12">
                                        <p>Q.{index+1}{''}{ques.statement}</p>
                                    </div>
                                </div> 

                            })
                        }
                        
                    </div>
                </div>
                
            </div>
        );
    }
}

export default ViewTest;