import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
export class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loaded: false
    }
    this.LogOut = this.LogOut.bind(this);
  }
  componentDidMount() {
    this.load();
  }
  load() {
    const path = "https://localhost:44307/api/Auth/user";
    axios.get(path, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      const user = response.data
      const loaded = true
      this.setState({ user: user })
      this.setState({ loaded: loaded })
      console.log(this.state.user);
    });
  }
  LogOut(){
    const path = "https://localhost:44307/api/Auth/logout";
    axios.post(path, null, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: null,
    }).then((response) => {
      console.log(response);
      this.setState({ loaded: false });
      this.render();
    })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {

    let { loaded, user } = this.state
    if (loaded) {
      return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
          <div >
            <Link to="/" className="navbar-brand">Home</Link>
          </div>
          <div className="col-md-10"></div>
          <div className="col-md-1">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link  className="nav-link" onClick={this.LogOut()}>logout</Link>
              </li>
              <li className="nav-item active">
                <Link to="/register" className="nav-link">Register</Link>
              </li>
            </ul>
          </div>
        </nav>
      );
    }
    else {
      return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
          <div >
            <Link to="/" className="navbar-brand">Home</Link>
          </div>
          <div className="col-md-10"></div>
          <div className="col-md-1">
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

}

export default Nav;