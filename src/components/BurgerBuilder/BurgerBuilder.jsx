import React, { Component } from 'react';
import Burger from '../Burger/Burger';
import BurgerControls from './../BurgerControls/BurgerControls';
import Modal from '../Modal/Modal';
import Backdrop from '../Backdrop/Backdrop';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from './../../store/actions'


class BurgerBuilder extends Component {


    constructor(props) {
        super(props);
        this.state = { 
            disable : false,
            purchaseable: false,
            modalOpen: false,
         }

    }

    componentDidMount = () =>{
       this.props.initIngredients()
     
    }


    updatePurchase = () =>{
        const ingredients = this.props.ings
        const igQty = Object.values(ingredients);
        const sum = igQty.reduce(function(accumulator, a){
            return accumulator + a;
        })
        return sum > 0;
    }

    OpenModal = () => {
        if(this.props.authComplete){
            this.setState({modalOpen: true});
        }
        else{
            this.props.history.push("/auth")
        }
            
    }

    CloseModal = () =>{
        this.setState({modalOpen: false});
    }

    ContinuePurchaseHandler = () =>{
        this.props.setPurchaseFlag()
        
        this.props.history.push({
            pathname: "/checkout"
        });

    }

    render() { 
        let controls =  <h1 style={{ textAlign: "center"}}> Something's Fishy, We are working on this. </h1>
        
        if(!this.props.displayError){
            controls = <React.Fragment>
                        <Burger {...this.props} className="mt-100" ingredients={this.props.ings} />
                         <BurgerControls
                         authComplete = {this.props.authComplete}
                         OpenModal={this.OpenModal} 
                        purchaseable={ this.updatePurchase() }
                         price={this.props.totalPrice} 
                         disable={this.state.disable}
                          {...this.props} />
                        </React.Fragment>
        }

        return ( 
            <React.Fragment>
                
                {this.state.modalOpen ?
                    <React.Fragment>
                        <Backdrop CloseModal={this.CloseModal} />
                        <Modal ContinuePurchaseHandler={this.ContinuePurchaseHandler} CloseModal={this.CloseModal} ingredients={this.props.ings} price={this.props.totalPrice}></Modal>
                    </React.Fragment>
                     : null
                }
                {controls}
                               
            </React.Fragment>
         );
    }
}
 

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice,
        displayError: state.displayError,
        purchaseSuccess: state.purchaseSuccess,
        authComplete: state.authComplete
    } 
}

const mapDispatchToProps = (dispatch ) => {
    return {
        handleIncrement :   (type) => dispatch(actionTypes.handleIncrement(type)),
        handleDecrement :   (type) => dispatch(actionTypes.handleDecrement(type)),
        handleReset :           () => dispatch(actionTypes.handleReset()),
        initIngredients:        () => dispatch(actionTypes.initIngredients()),
        setPurchaseFlag:        () => dispatch(actionTypes.setPurchaseFlag()) 
        
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps) ( withRouter(BurgerBuilder) );