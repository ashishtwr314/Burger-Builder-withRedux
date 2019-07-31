import React, { Component } from 'react';
import Navigation from './../Navigation/Navigation';
import './Layout.css'
import SideDrawer from '../Navigation/SideDrawer';
import { Route, Link, Switch, withRouter }  from 'react-router-dom';
import CheckoutSummary from '../Checkout/CheckoutSummary';
import Orders from '../Orders/Orders';
import Auth from '../Auth/Auth'
import {connect} from 'react-redux';
import Logout from '../Auth/Logout';
import * as actionTypes from "../../store/actions"
import { toast } from 'react-toastify';


class Layout extends Component {

    state = {
        closeSideDrawer: true
    }

    closeSideDrawer = () => {
        this.setState({
            closeSideDrawer: true
        })
    }
    
    openSideDrawer = () => {
        this.setState({
            closeSideDrawer: false
        })
    }
    
    componentDidUpdate = () => {
        if(this.props.displayToast){
           toast.success("You can order your buger now !", {
               position: toast.POSITION.TOP_CENTER,
               className: "toast",
               hideProgressBar: true,
               autoClose: 3000
           })

           this.props.setDisplayToast()
        } 
    }
    
    render(){
        return(
            <React.Fragment>      
                
                <Navigation isAuthenticated={this.props.isAuthenticated} openSideDrawer={this.openSideDrawer} />
                {   
                this.state.closeSideDrawer
                 ? null : 
                    <SideDrawer closeSideDrawer={this.closeSideDrawer} />
                } 
                <div style={{ marginTop: "100px" }}>
                <Switch>
                        <Route  path="/checkout" render={ () => 
                            <CheckoutSummary  />
                        }/>

                        <Route  path="/orders" render={ () => 
                            <Orders  />
                        }/>

                        <Route path="/auth" render= { ()=> 
                            <Auth />
                        } />
                         <Route path="/logout" render= { ()=> 
                            <Logout />
                        } />
                        
                        
    
                        <Route  path="/burger" render={ () => 
                            <h1>Bro, you wanna order a Burger ? <Link to="/">Click Me</Link></h1>
                        }/>

                        
                        <Route  path="/" render={ ()=>
                            <main className="container">
                                {this.props.children}
                            </main>
                        } />
                       
                </Switch>
                    
                </div>

               
            </React.Fragment>
        )
    }
}

export const mapStateToProps = (state) => {
    return{
        isAuthenticated : state.idToken !== null,
        displayToast: state.displayToast
    }
}
export const mapDispatchToProps = (dispatch) => {
    return {
        setDisplayToast: () => dispatch(actionTypes.setDisplayToast())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));