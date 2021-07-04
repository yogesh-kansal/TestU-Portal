import React, { Component } from 'react';
import axios from 'axios';
import {baseUrl} from '../assets/config';

export const authContext=React.createContext();

class AuthContextProvider extends Component {
    state= {
        loginStatus:false,
        accesstoken:null,
        user:null,
        data:null
    }

    modifyAuthStatus=(data) => {
        console.log(data)
        localStorage.setItem('refresh',data.refreshtoken);
        this.setState({
            loginStatus:true,
            accesstoken:data.accesstoken,
            user:data.user
        })
    }

    isLoggedin =()=> {
        console.log('called')

        if(!this.state.accesstoken)
        {
            let token=localStorage.getItem('refresh');
            console.log(token);

            if(!token)
                return ;
            axios.get(baseUrl+'/refreshtoken', {
                headers: {
                    'Authorization': 'Bearer '+token
                }
            })
            .then(res => {
                console.log(res);
                this.setState({
                    loginStatus:true,
                    accesstoken:res.data.accesstoken,
                    user:res.data.user
                })
            })
            .catch(err => {
                console.log(err.response)
                alert(err.message);
                this.setState({
                    loginStatus:false
                })
            });
        }
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
                        modifyAuthStatus:this.modifyAuthStatus,
                        isLoggedin:this.isLoggedin,
                        modifyInfo:this.modifyInfo,
                        modifyData:this.modifyData}
            }>
                {this.props.children}
            </authContext.Provider>
        );
    }
}

export default AuthContextProvider;


/**
isLoggedin: true,
        user:{
            "isVerified": true,
            "createdList": [
                "60dcd32ebc64fd18f4ea7648","60da1fae33cf9913c42e0503"
            ],
            "availableList": ["60dcd32ebc64fd18f4ea7648","60da1fae33cf9913c42e0503"],
            "_id": "60a80c6bc928253054a54515",
            "username": "admin",
            "password": "$2b$10$2xtjdfcDhrghf8F24iJPyey7Yll7l3Fr7NneZcqW8wOGkZTlxnelm",
            "emailId": "admin@gmail.com",
            "createdAt": "2021-05-21T19:39:27.117Z",
            "updatedAt": "2021-06-13T20:00:14.473Z",
            "__v": 0,
            "institute": "IIT kanpur",
            "takenList": [{id:"60dcd32ebc64fd18f4ea7648", answers:[[1],[1,3]],marks_obt:20},{id:"60da1fae33cf9913c42e0503"}]
        },
        accesstoken:null,
        jwtToken:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNjIzNjE0MDgzLCJleHAiOjE2MjcyMTQwODN9.gsiBlUNvy_7rTGLva46anK_vZVpyHXBPmCr01BWbE28',
        data:null
 */
