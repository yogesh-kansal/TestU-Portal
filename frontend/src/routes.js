import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom';
import { Component } from 'react';
import {authContext} from './contexts/authContext';
import TestContextProvider from './contexts/testContext';
import './App.css';

import Home from './components/Dashboard/home';
import Attempts from './components/Dashboard/attempts';
import Creates from './components/Dashboard/creates';

import NewTest from './components/Dashboard/Test/newTest';
import TakeTest from './components/Dashboard/Test/attemptTest';
import ViewTest from './components/Dashboard/Test/viewTest';

import Header from './components/Header/header';
import Footer from './components/Footer/footer';

import Login from './components/Auth/login';
import Signup from './components/Auth/signup';
import ForgotPswd from './components/Auth/forgot_pswd';

import Profile from './components/User/profile';
import Edit from './components/User/edit';

class Routers extends Component {
    static contextType=authContext;

    componentDidMount() {
      console.log('mounted');
      this.context.isLoggedin();
    }

    componentDidUpdate(){
      console.log('updated')
    }
  
    render() {
      let {loginStatus}=this.context;
      console.log(loginStatus)
      return (
        <div className="App">
          <div className="wrap">
            <BrowserRouter>
                <Header/>

                {!loginStatus
                ?
                  <Switch>
                    <Route path="/login" component={(props) => <Login {...props}/>}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path='/forgotPswd' component={ForgotPswd}/>
                    <Redirect to={"/signup"}/>
                  </Switch>
                :
                  <Switch>
                    <TestContextProvider>
                      <Route path="/home" component={Home}/>
                      <Route path="/creates" component={Creates}/>
                      <Route path="/taken" component={Attempts}/>
      
                      <Route exact path="/test/new" component={NewTest}/>
                      <Route path="/test/take/:id" component={TakeTest}/>
                      <Route path="/test/:type/view/:id" component={ViewTest}/>
            
                      <Route exact path="/user" component={Profile}/>
                      <Route path="/user/edit" component={Edit}/>
                      <Redirect to={"/home"}/>
                    </TestContextProvider>
                  </Switch>
                }      
            </BrowserRouter>
            </div>
            <Footer/>
        </div>
      );
  
    }
  }
  
  export default Routers;
  