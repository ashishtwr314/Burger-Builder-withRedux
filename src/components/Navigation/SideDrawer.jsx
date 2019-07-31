import React from 'react';
import Logo from './Logo';
import Nav from './Nav';
import Backdrop from '../Backdrop/Backdrop';

const SideDrawer = (props) => {
    return ( 
        <React.Fragment>
            <Backdrop CloseModal={props.closeSideDrawer} />
            <div className="sideDrawer">
                <Logo />
                <Nav />
            </div>
        </React.Fragment>
    );
}
 
export default SideDrawer;