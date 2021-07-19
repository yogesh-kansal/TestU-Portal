import React, { Component } from 'react';
import axios from 'axios';
import {baseUrl} from '../assets/config';
import { authContext } from './authContext';

export const testContext=React.createContext();

class TestContextProvider extends Component {
    static contextType=authContext;
    state= {
        createdData:null,
        takenData:null,
        create_err:'',
        taken_err:'',
        create_loading:false,
        taken_loading:false
    }

    refreshCreatedList=() => {
        this.setState({
            create_loading:true
        })
        console.log("called");
        axios.get(baseUrl+'/test?type=created',{
            headers: {
                'Authorization': 'Bearer '+this.context.accesstoken
            }
        })
        .then(res => {
            console.log(res)
            this.setState({
                createdData:res.data.data,
                create_loading:false,
                create_err:''
            })
        })
        .catch(err => {
            this.setState({
                create_err:'something went wrong!!!',
                create_loading:false
            })

            if(err.response)
                alert(err.response.data)
            else
                alert(err.message)
        });
    }

    refreshTakenList=() => {
        this.setState({
            taken_loading:true
        })
        console.log("called");
        axios.get(baseUrl+'/test?type=taken',{
            headers: {
                'Authorization': 'Bearer '+this.context.accesstoken
            }
        })
        .then(res => {
            this.setState({
                takenData:res.data.data,
                taken_loading:false,
                taken_err:''
            })
        })
        .catch(err => {
            this.setState({
                taken_err:'something went wrong!!!',
                taken_loading:false
            })

            if(err.response)
                alert(err.response.data)
            else
                alert(err.message)
        });
    }

    modifyData =(data) => {
        this.setState({
            data
        })
    } 

    render() {
        return (
            <testContext.Provider value={{...this.state,
                        accesstoken:this.context.accesstoken,
                        refreshCreatedList:this.refreshCreatedList,
                        refreshTakenList:this.refreshTakenList,
                        modifyData:this.modifyData
                    }
            }>
                {this.props.children}
            </testContext.Provider>
        );
    }
}

export default TestContextProvider;
