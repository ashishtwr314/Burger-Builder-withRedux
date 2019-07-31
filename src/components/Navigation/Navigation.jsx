import React from 'react';
import  './Navigation.css';
import Nav from './Nav';
import Logo from './Logo';

const Navigation = (props) => {
    return ( 
        <div className="navbar">
            <div className="left">
                <div onClick={props.openSideDrawer} > <Logo  /> </div>
            </div>
            
            <div className="right">
                <Nav isAuthenticated={props.isAuthenticated} />
            </div>
            
        </div>
     );
}
 
export default Navigation;