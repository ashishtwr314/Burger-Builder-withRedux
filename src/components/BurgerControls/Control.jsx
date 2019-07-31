import React from 'react';
import './BurgerControls.css';
import plusIcon from "./../../assets/images/plus.svg";
import minusIcon from "./../../assets/images/minus.svg";

const Control = (props) => {
    return ( 
        
            <div className="control">
                <div className="label">{props.label} </div>
                <div>
                    <button className="btn btn-more" onClick={props.handleIncrement}> 
                        <img src={plusIcon} alt="PLUS ICON" className="svg" />
                    </button>
                    <button  className="btn btn-less"  onClick={props.handleDecrement} >
                        <img src={minusIcon} alt="MINUS ICON" className="svg" />
                    </button>
                </div>
            </div>
     );
}
 
export default Control;