import React, { Component } from 'react';
import axios from 'axios';
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // user: null
    }
  }
  componentDidMount() {
    // this.load();      // withCredentials: true,
    const path = "https://localhost:44307/api/Auth/user";
    axios.get(path).then((response) => {
      // const user = response.data
      // this.setState({ user: user })
      console.log(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }
  // load() {
  //   const path = "https://localhost:44307/api/Auth/user";
  //   axios.get(path, {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     withCredentials: true,
  //   }).then((response) => {
  //     const user = response.data
  //     this.setState({ user: user })
  //     console.log(this.state.user);
  //   });
  // }
  render() {
    return (<h1>Hello</h1>);
  }
}

export default Home;