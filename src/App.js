import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './components/BurgerBuilder/BurgerBuilder';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from "react-redux";
import { authSuccess } from "./store/actions";

class App extends Component {

  componentDidMount = () => {
    toast.configure()  
    if(localStorage.idToken){
      this.props.authSuccess(localStorage.idToken)
    }
  }

  render(){
    
    return(
      <BrowserRouter>
        <Layout>
          <BurgerBuilder />
        </Layout>
      </BrowserRouter>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    authSuccess : (idToken) => dispatch(authSuccess(idToken))
  }
}
export default connect(null, mapDispatchToProps)(App);
