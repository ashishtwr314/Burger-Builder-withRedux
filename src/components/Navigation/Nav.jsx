import React from 'react';
import './Navigation.css';
import { NavLink, withRouter } from 'react-router-dom';

const Nav = (props) => {
    return ( 
    
        <ul className="nav">  

            <li><NavLink exact to="/" activeClassName="active">Burger Builder</NavLink></li>
            
            {!props.isAuthenticated ? 
               
                   
                    <li><NavLink exact to="/auth" activeClassName="active">Log in</NavLink></li>
                

                 : 
                 <React.Fragment>
                    <li><NavLink exact to="/orders" activeClassName="active">Orders</NavLink></li>
                    <li><NavLink exact to="/logout" activeClassName="active">Logout</NavLink></li>
                </React.Fragment>
            }
        </ul>
     );
}
 
export default withRouter(Nav);