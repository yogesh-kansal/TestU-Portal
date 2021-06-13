import React from 'react';

const LoadingSpinner =()=> {
        return (
            <div className="container">
                <div className="row justify-content-center" style={{margin:"50px"}}>
                    <div className="col-auto">
                        <span className="fa fa-spinner fa-pulse fa-4x fa-fw text-danger"></span>
                    </div>
                </div>
                <div className="row justify-content-center mt-2">
                    <div className="col-auto">
                        <h3>loading...</h3>
                    </div>
                </div>
            </div>
            
        );
}

export default LoadingSpinner;