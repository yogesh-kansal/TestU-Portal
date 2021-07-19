import { Component } from 'react';
import AuthContextProvider from './contexts/authContext';
import Routes from './routes';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'font-awesome/css/font-awesome.min.css'



class App extends Component {
  render() {
    return (
      <div className="">
        <AuthContextProvider>
          <Routes/>
        </AuthContextProvider>
      </div>
    );

  }
}

export default App;
