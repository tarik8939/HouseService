import React, { Component } from 'react';
import axios from 'axios'
import {Redirect} from 'react-router-dom';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      Email: "",
      Password: "",
      redirect: false
     };
     this.handleInputChange = this.handleInputChange.bind(this);
     this.Submit = this.Submit.bind(this);
  }
  handleInputChange (event) {
    const name = event.target.name;
        const value = event.target.value;
    this.setState({ [name]: value });
  }
async Submit(event) {
  event.preventDefault();
  await fetch('https://localhost:44307/api/login',  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(this.state), 
      });
      this.setState({redirect:true});
      this.render();
}
  render() { 
    if(this.state.redirect)
    return (<Redirect to="/"/>);
    return ( 
    <form className="form-signin" onSubmit={this.Submit}>
    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
    <label >Email address
    <input type="email" className="form-control" placeholder="Email address" name="Email" onChange={this.handleInputChange}  value={this.state.Email} required  />
    </label>
    <label >Password
    <input type="password" name="Password" className="form-control" placeholder="Password" required onChange={this.handleInputChange}  value={this.state.Password} />
    </label>
    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
  </form>
   );
  }
}
 
export default Login;