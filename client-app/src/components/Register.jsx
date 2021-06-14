import React, { Component } from 'react';
import axios from 'axios'
import {Redirect} from 'react-router-dom';
export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      Name: "",
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
  await fetch('https://localhost:44307/api/register',  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state), 
      });
      
      this.setState({redirect:true});
      this.render();
}


  render() { 
    if(this.state.redirect)
    return (<Redirect to="/login"/>);
    else
    return ( 
    <form onSubmit={this.Submit} >
    <h1 className="h3 mb-3 font-weight-normal">Please Register</h1>
    <label >Name
    <input type="text" className="form-control" placeholder="FullName" onChange={this.handleInputChange} name="Name" value={this.state.Name} required  />
    </label>
    <label >Email address
    <input type="email" className="form-control" placeholder="Email address" name="Email" onChange={this.handleInputChange}  value={this.state.Email} required  />
    </label>
    <label >Password
    <input type="password" name="Password" className="form-control" placeholder="Password" required onChange={this.handleInputChange}  value={this.state.Password} />
    </label>
    <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
  </form> 
  );
  }
}
 
export default Register;