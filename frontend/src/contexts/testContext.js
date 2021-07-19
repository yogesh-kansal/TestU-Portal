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
        availData:null,
        create_err:'',
        taken_err:'',
        avail_err:'',
        create_loading:false,
        taken_loading:false,
        avail_loading:false
    }

    refreshAvailList=() => {
        this.setState({
            avail_loading:true
        })
        axios.get(baseUrl+'/test?type=available',{
            headers: {
                'Authorization': 'Bearer '+this.context.accesstoken
            }
        })
        .then(res => {
            this.setState({
                availData:res.data.data,
                avail_loading:false,
                avail_err:''
            })
        })
        .catch(err => {
            this.setState({
                avail_err:'something went wrong!!!',
                avail_loading:false
            })

            if(err.response)
                alert(err.response.data)
            else
                alert(err.message)
        });
    }

    refreshCreatedList=() => {
        this.setState({
            create_loading:true
        })
        axios.get(baseUrl+'/test?type=created',{
            headers: {
                'Authorization': 'Bearer '+this.context.accesstoken
            }
        })
        .then(res => {
            console.log(res.data.data)
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
        axios.get(baseUrl+'/test?type=taken',{
            headers: {
                'Authorization': 'Bearer '+this.context.accesstoken
            }
        })
        .then(res => {
            console.log(res)
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

    render() {
        return (
            <testContext.Provider value={{...this.state,
                        accesstoken:this.context.accesstoken,
                        refreshAvailList:this.refreshAvailList,
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
