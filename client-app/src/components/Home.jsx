import React, { Component } from 'react';
import axios from 'axios';
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      loading: true
    }
  }
  componentDidMount() {
   this.load();
  }
  async load(){
    const path = 'https://localhost:44307/api/Auth/user';

    await fetch(path,  {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(response => response.json())
    .then(response => {
    
        this.setState({loading:false, userName:response.fullName});
        this.render();
    
    })

  }
  render() {
    if(this.state.loading)
    return (<h1>Hello</h1>);
    if(!this.state.loading)
    return (<h1>Fuck you {this.props.user.fullName}</h1>);
  }
}

export default Home;