import React, { Component } from 'react';
import axios from 'axios';
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    this.load();
  }
  load() {
    axios.get('https://localhost:44307/api/user', {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    }).then((response) => {
      console.log(response);
    });

  }
  render() {
    return (<h1>Hello</h1>);
  }
}

export default Home;