import React, { Component } from 'react';
import Burger from '../Burger/Burger';
import './CheckoutSummary.css';
import { Route, withRouter, Redirect } from 'react-router-dom';
import ContactForm from '../ContactForm/ContactForm';
import Backdrop from '../Backdrop/Backdrop';
import Spinner from '../Spinner/Spinner';
import { connect } from 'react-redux';
import * as actionTypes  from './../../store/actions';

class CheckoutSummary extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            ingredients:{},
            price: null
         }
    }
    cancellCheckout = () =>{
        this.props.history.goBack();
    }

    continueCheckout = () => {
        this.props.history.replace('/checkout/proceed');
    }

    
    placeOrderHandler = (event, customerData, submitStatus) =>{
        event.preventDefault();

        if(submitStatus){

            let customerDataTransfromed = {}
            for(let elem in customerData){
                customerDataTransfromed[elem] = customerData[elem].value;
            }

            const data = {
                ingredients : this.props.ings,
                price: this.props.totalPrice,
                customerData: customerDataTransfromed
            }

            this.props.purchaseBurger(data, this.props.idToken)
        

        }
        else{
            alert("Please fill the form correclty");
        }

               
    }

    render() {
        return ( 
            
            <React.Fragment>

                
                    <div className="CheckoutSummary">
                        <h1>Well, That looks like a Tasty Burger</h1>
                        <Burger ings={this.props.ings} />
                        <button type="button" onClick={this.cancellCheckout} className="btn btn-neg">Cancel</button>
                        <button type="button" onClick={this.continueCheckout} className="btn btn-pos">Continue</button>
                    </div>
                
                    {
                        this.props.loading ? <React.Fragment> <Backdrop /> <Spinner /> </React.Fragment> : null
                    }         
                    {
                        this.props.purchaseSuccess ? <Redirect to="/" /> : null
                    }           
                                
                
                    <Route path={  this.props.match.path + "/proceed" } render={() => (
                        <ContactForm  placeOrderHandler={this.placeOrderHandler}  />
                    )} />

                
            </React.Fragment>
         );
    }
}
const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice,
        orderData: state.orderData,
        purchaseSuccess: state.purchaseSuccess,
        loading: state.loading,
        idToken: state.idToken
    } 
}
const mapDispatchToProps = (dispatch) => {
    return{
        purchaseBurger : (orderData, idToken) => dispatch(actionTypes.purchaseBurger(orderData, idToken))
    }
}

export default withRouter ( connect(mapStateToProps, mapDispatchToProps) ( CheckoutSummary ) ); 