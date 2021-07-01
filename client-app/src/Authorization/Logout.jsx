import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom';
export class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    const path = "https://localhost:44307/api/Auth/logout";
    axios.post(path, null, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: null,
      withCredentials: true,
    }).then((response) => {
      console.log(response);
      this.props.handleLogout();
    })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
      return (<h1 className="text-center">You've logged out</h1>)
  }
}

export default Logout;