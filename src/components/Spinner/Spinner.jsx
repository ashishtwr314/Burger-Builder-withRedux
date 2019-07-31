import React from 'react';
import SpinnerGif from '../../assets/images/spinner.gif'



const Spinner = () => {
    return ( 
        <div style={{ background: "#fff", zIndex: "900",  position: "absolute", top : "50%", left: "50%", marginLeft: "-100px",  marginTop: "-100px"}} >
            <img width="200px"  src={SpinnerGif} alt="Spinner" />
        </div>
     );
}
 
export default Spinner;