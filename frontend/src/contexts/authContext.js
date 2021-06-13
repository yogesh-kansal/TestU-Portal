import React, { Component } from 'react';

export const authContext=React.createContext();

class AuthContextProvider extends Component {
    state= {
        isLoggedin: true,
        user:{
            _id:"60a80c6bc928253054a54515",
            emailId:'admin@gmail.com',
            username:'admin',
            institute:'IIT BBS',
            createdList:["60c387baf2bf392894898863"],
            takenList:[{id:"60c387baf2bf392894898863"}],
            availableList:["60c387baf2bf392894898863"]
        },
        jwtToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNjIzNTkyNzM3LCJleHAiOjE2MjM1OTYzMzd9.IqquW8CotcRpwLUcyaP6MomzoWBjwvBGqFk5r7rmLcQ",
        data:null
    }

    modifystatus=(token) => {
        this.setState({
            isLoggedin:!this.state.isLoggedin,
            jwtToken:token
        })
    }

    modifyInfo=(user) => {
        this.setState({
            user
        })
    }

    modifyData =(data) => {
        this.setState({
            data
        })
    } 

    render() {
        return (
            <authContext.Provider value={{...this.state,
                        modifystatus:this.modifystatus,
                        modifyInfo:this.modifyInfo,
                        modifyData:this.modifyData}
            }>
                {this.props.children}
            </authContext.Provider>
        );
    }
}

export default AuthContextProvider;
