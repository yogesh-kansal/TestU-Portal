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
        console.log("done")
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

    logOut= () => {
        localStorage.clear();
        this.setState({
            loginStatus:false,
        accesstoken:null,
        user:null,
        data:null
        });
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
                        modifyData:this.modifyData,
                        logOut:this.logOut}
            }>
                {this.props.children}
            </authContext.Provider>
        );
    }
}

export default AuthContextProvider;
