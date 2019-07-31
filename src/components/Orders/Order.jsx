import React from 'react';
import './Orders.css'

const Order = (props) => {

    let ingredients = []
    for(let ingredient in props.ingredients){

        ingredients.push( {
            name: ingredient,
            amount: props.ingredients[ingredient]
        } )
    }
    let details = ingredients.map(ig => (
        <span key={ig.name} className="Ig__detials">{ig.name} : ({ig.amount}) </span>
    ))

    return ( 
        <div key={props.key} className="Order">
            <p className="ingredients">Ingredients: {details} </p>
            <p className="price">TotalPrice: <span><b>{props.price}</b> INR</span> </p>
        </div>
     );
}
 
export default Order;