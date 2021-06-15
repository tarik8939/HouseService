import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
export class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {

  }
  render() {
    if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
      return this.loadingView();
  }
  else if(this.props.loggedInStatus === "LOGGED_IN"){
      return this.isLoadView();
  }
  }
isLoadView(){
      return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
          <div >
            <Link to="/" className="navbar-brand">Home</Link>
          </div>
          <div className="col-md-10"></div>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link">Hello {this.props.user.fullName}</a>
              </li>
              <li className="nav-item active">
                <Link  className="nav-link" to="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        </nav>
      );
    }
loadingView(){
      return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
          <div >
            <Link to="/" className="navbar-brand">Home</Link>
          </div>
          <div className="col-md-10"></div>
          <div>
            <ul className="navbar-nav ml-auto">
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