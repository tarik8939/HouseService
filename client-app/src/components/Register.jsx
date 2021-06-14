import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom';
export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName: "",
      LastName: "",
      Email: "",
      PhoneNum: "",
      Password: "",
      redirect: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.Submit = this.Submit.bind(this);
  }
  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }
  async Submit(event) {
    event.preventDefault();
    await fetch('https://localhost:44307/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state),
    });

    this.setState({ redirect: true });
    this.render();
  }


  render() {
    if (this.state.redirect)
      return (<Redirect to="/login" />);
    else
      return (
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <form onSubmit={this.Submit} >
              <div className="text-center">
                <h1 className="h3 mb-3 font-weight-normal">Please Register</h1>
                <div className="form-group">
                  <label className="col-md-8">First name
                    <input type="text" className="form-control" placeholder="First name"
                      onChange={this.handleInputChange} name="FirstName" value={this.state.FirstName} required />
                  </label>
                </div>
                <div className="form-group">
                  <label className="col-md-8">Last name
                    <input type="text" className="form-control" placeholder="Last name"
                      onChange={this.handleInputChange} name="LastName" value={this.state.LastName} required />
                  </label>
                </div>
                <div className="form-group">
                  <label className="col-md-8">Email address
                    <input type="email" className="form-control" placeholder="Email address" name="Email"
                      onChange={this.handleInputChange} value={this.state.Email} required />
                  </label>
                </div>
                <div className="form-group">
                  <label className="col-md-8">Phone number
                    <input type="text" className="form-control" placeholder="Phone number" name="PhoneNum"
                      onChange={this.handleInputChange} value={this.state.PhoneNum} required />
                  </label>
                </div>
                <div className="form-group">
                  <label className="col-md-8">Password
                    <input type="password" name="Password" className="form-control" placeholder="Password"
                      onChange={this.handleInputChange} value={this.state.Password} required />
                  </label>
                </div>
                <div className="form-group">
                  <label className="col-md-8">
                    <button className="btn col-md-12 btn-primary text-center" type="submit">Register</button>
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
  }
}

export default Register;