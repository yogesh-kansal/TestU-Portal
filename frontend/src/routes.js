import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom';
import { Component } from 'react';
import {authContext} from './contexts/authContext';

import Home from './components/Dashboard/home';
import Attempts from './components/Dashboard/attempts';
import Creates from './components/Dashboard/creates';

import NewQuiz from './components/Dashboard/Quiz/newQuiz';
import TakeQuiz from './components/Dashboard/Quiz/takeQuiz';

import Header from './components/Header/header';
import Footer from './components/Footer/footer';

import Login from './components/Auth/login';
import Signup from './components/Auth/signup';

import Profile from './components/User/profile';
import Edit from './components/User/edit';

class Routers extends Component {
    static contextType=authContext;
  
    render() {
     console.log(this.context);
      return (
        <div className="App">
            <BrowserRouter>
                <Header />
      
                <Switch>
                  <Route path="/login" component={Login}/>
                  <Route path="/signup" component={Signup}/>
                  <Route path="/home" component={Home}/>
                  <Route path="/creates" component={Creates}/>
                  <Route path="/taken" component={Attempts}/>
  
                  <Route exact path="/quizz/new" component={NewQuiz}/>
                  <Route path="/quizz/take/:id" component={TakeQuiz}/>
                  <Route path="/quizz/view/:id" component={TakeQuiz}/>
        
                  <Route exact path="/user" component={Profile}/>
                  <Route path="/user/edit" component={Edit}/>
                  <Redirect to={!1?"/signup":"/signup"}/>
                </Switch>
      
                <Footer />       
            </BrowserRouter>
        </div>
      );
  
    }
  }
  
  export default Routers;
  