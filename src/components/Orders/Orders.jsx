import React, { Component } from 'react';
import Order from './Order';
import Spinner from '../Spinner/Spinner';
import Backdrop from '../Backdrop/Backdrop';
import { connect } from 'react-redux';
import * as actionTypes from "../../store/actions";


class Orders extends Component {

    componentWillMount = () =>{ 
        this.props.fetchOrderStart(this.props.idToken)
    }

    render() { 
        
        return ( 

            <React.Fragment>
               {
                   

                    this.props.ordersLoading ?
                        
                       <React.Fragment><Backdrop /> <Spinner />    </React.Fragment>
                    :
                        this.props.orders.map(order => (
                            <Order ingredients={order.ingredients} price={order.price} key={order.id} />
                        ))
                    
                    
               }
            </React.Fragment>
         );
    }
}
 
const mapStateToProps = (state) =>{
    return{
        orders: state.orders,
        ordersLoading: state.ordersLoading,
        idToken : state.idToken,
        authComplete: state.authComplete
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        fetchOrderStart : (idToken) => dispatch(actionTypes.fetchOrderStart(idToken))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);