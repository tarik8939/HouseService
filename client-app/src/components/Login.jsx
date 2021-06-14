import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom';

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
  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }
  async Submit(event) {
    event.preventDefault();
    const path = "https://localhost:44307/api/Auth/login";
    await fetch(path,  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(this.state), 
      }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        // this.setState({ redirect: true });
        // this.render();
        this.asd()
      }

    }).catch((error) => {
        console.log(error);
      });
  }
  asd(){
    const path = 'https://localhost:44307/api/Auth/user';
    // axios.get(path).then((response) => {
    //   // const user = response.data
    //   // this.setState({ user: user })
    //   console.log(response.data);
    // }).catch((error) => {
    //   console.log(error);
    // });

    axios.get(path, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    }).then((response) => {
      console.log(response);
    });
  }
  render() {
    if (this.state.redirect)
      return (<Redirect to="/" />);
    return (
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <form className="form-signin" onSubmit={this.Submit}>
            <div className="text-center">
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
              <div className="form-group">
                <label className="col-md-8">Email
                  <input type="email" className="form-control" placeholder="Email" name="Email"
                    onChange={this.handleInputChange} value={this.state.Email} required />
                </label>
              </div>
              <div className="form-group">
                <label className="col-md-8">Password
                  <input type="password" className="form-control" placeholder="Password" name="Password"
                    onChange={this.handleInputChange} value={this.state.Password} required />
                </label>
              </div>
              <div className="form-group">
                <label className="col-md-8">
                  <button className="btn col-md-12 btn-primary text-center" type="submit">Sign in</button>
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;