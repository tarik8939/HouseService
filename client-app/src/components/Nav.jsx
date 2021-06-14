import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <Link to="/" className="navbar-brand">Home</Link>
      <div>
        <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item active">
              <Link to="/register" className="nav-link">Register</Link>
            </li>
        </ul>
      </div>
    </nav>
     );
  }
}
 
export default Nav;