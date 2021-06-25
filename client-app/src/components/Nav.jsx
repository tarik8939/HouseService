import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import logo from "../logo.png"
export class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
  }
  render() {



    if (this.props.loggedInStatus === "LOGGED_IN" && this.props.user.userTypeID == 1) {
      return this.authenticatedViewForHouseOwner();
    }
    else if (this.props.loggedInStatus === "LOGGED_IN" && this.props.user.userTypeID == 2) {
      return this.authenticatedViewForContractor();
    }
    else if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
      return this.notAuthenticatedView();
    }
  }
  authenticatedViewForHouseOwner() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light border-bottom border-grey mb-5">
        <div className="container-fluid">
          <div className="navbar-brand">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block mr-2"
            />
            <Link to="/" className="navbar-brand">House service</Link>
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
                <a className="nav-link">Hello, {this.props.user.fullName}!</a>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    );
  }

  authenticatedViewForContractor() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light border-bottom border-grey mb-5">
        <div className="container-fluid">
          <div className="navbar-brand">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block mr-2"
            />
            <Link to="/" className="navbar-brand">House service</Link>
          </div>
          <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
              <li className="nav-item active">
                <Link to="/" className="nav-link" >All Ads</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/AllReq">My Requests</Link>
              </li>
            </ul>
            <ul class="nav navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link">Hello {this.props.user.fullName}</a>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
        <hr style={{ border: 'none', height: '3px', backgroundColor: 'grey' }}></hr>
      </nav>

    );
  }
  notAuthenticatedView() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light border-bottom border-grey mb-5">
        <div className="container-fluid">
          <div className="navbar-brand">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block mr-2"
            />
            <Link to="/" className="navbar-brand">House service</Link>
          </div>
          <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
              <li className="nav-item active">
                <Link to="/" className="nav-link" >All Ads</Link>
              </li>
            </ul>
            <ul class="nav navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;