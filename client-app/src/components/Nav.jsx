import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
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
    if (this.props.loggedInStatus === "LOGGED_IN") {
      return this.authenticatedView();
  }
  else if(this.props.loggedInStatus === "NOT_LOGGED_IN"){
      return this.notAuthenticatedView();
  }
  }
  authenticatedView(){
      return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
           <div class="container-fluid">
              <div class="navbar-header">
            <Link to="/" className="navbar-brand">Home</Link>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
            <li className="nav-item active">
                <Link to="/" className="nav-link" >All Ads</Link>
            </li>
            <li className="nav-item active">
                <Link className="nav-link" to="/newAd">Create New Ad</Link>
            </li>
            <li className="nav-item active">
                <Link className="nav-link" to="/myAds">My Ads</Link>
            </li>
            </ul>
            <ul class="nav navbar-nav ml-auto">
            <li className="nav-item active">
                <a className="nav-link">Hello {this.props.user.fullName}</a>
              </li>
              <li className="nav-item active">
                <Link  className="nav-link" to="/logout">Logout</Link>
              </li>
            </ul>
          </div>
          </div>
        </nav>
        
      );
    }
notAuthenticatedView(){
      return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
           <div class="container-fluid">
              <div class="navbar-header">
            <Link to="/" className="navbar-brand">Home</Link>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
            <li className="nav-item active">
                <Link to="/" className="nav-link" >All Ads</Link>
            </li>
            </ul>
            <ul class="nav navbar-nav ml-auto">
            <li className="nav-item active">
            <Link  className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item active">
                <Link  className="nav-link" to="/register">Register</Link>
              </li>
            </ul>
          </div>
          </div>
        </nav>
      );
    }
}

export default Nav;