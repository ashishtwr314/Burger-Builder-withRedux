import React from 'react';
import AppLogo from '../../assets/images/133 burger-logo.png';
import './Navigation.css';

const Logo = () => {
    return ( 
        <div className="logo">
            <img src={AppLogo} alt="Logo" />
        </div>
     );
}
 
export default Logo;