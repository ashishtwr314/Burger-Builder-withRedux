import React from 'react';
import './Modal.css';

const Modal = (props) => {
    
    const ingredients = Object.keys(props.ingredients)
                        .map(ig => {
                            return  <li key={ig}><span style={{textTransform: 'capitalize'}}>{ig}</span>: {props.ingredients[ig]}</li>;
                        })
    return ( 
        <div className="Modal">
            This delecious burger will contain
            <ul>
                {ingredients}
            </ul>
            and will cost you: {props.price} INR
            <br />
            <br />

            <button onClick={props.CloseModal} className="btn btn-neg">CANCEL</button>
            <button onClick={props.ContinuePurchaseHandler} className="btn btn-pos">CONTINUE</button>
        </div>
     );
}
 
export default Modal;