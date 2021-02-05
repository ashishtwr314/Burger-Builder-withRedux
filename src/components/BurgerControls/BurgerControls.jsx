import React from "react";
import Control from "./Control";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Meat", type: "meat" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
];

const BurgerControls = (props) => {
  return (
    <React.Fragment>
      <div className="controls-wrapper">
        <p className="price">
          Current Price: <b>{props.price} /- INR</b>
        </p>
        <div className="controls">
          {controls.map((control) => {
            return (
              <Control
                disable={props.disable}
                handleDecrement={() => props.handleDecrement(control.type)}
                handleIncrement={() => props.handleIncrement(control.type)}
                label={control.label}
                type={control.type}
                key={control.label}
              />
            );
          })}
          <div className="order-controls">
            <button
              disabled={!props.purchaseable}
              onClick={props.OpenModal}
              className="order-btn"
            >
              {props.authComplete ? "ORDER NOW" : "Sign Up"}
            </button>
            <button
              disabled={!props.purchaseable}
              onClick={props.handleReset}
              className="reset-btn"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      <div style={{ height: "100px" }} className="copyright">
        <h4>
          Under developement by{" "}
          <a href="https://www.linkedin.com/in/ashishtwr314/">Ashish Tiwari</a>
        </h4>
        <h6>All rights reserved. Controls Design copyright &copy;</h6>
      </div>
    </React.Fragment>
  );
};

export default BurgerControls;
