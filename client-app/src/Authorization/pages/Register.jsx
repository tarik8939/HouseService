import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import { FormErrors } from '../../Advertisement/components/FormErrors';
export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName: "",
      LastName: "",
      Email: "",
      PhoneNumber: "",
      password: "",
      userTypeID: "",
      redirect: false,
      formErrors: { Email: '', PhoneNumber: '', FirstName: '', LastName: '' },
      EmailValid: false,
      PhoneNumberValid: false,
      FirstNameValid: false,
      LastNameValid: false,
      formValid: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.Submit = this.Submit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.validateField = this.validateField.bind(this);
    this.errorClass = this.errorClass.bind(this);
  }
  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }
  async Submit(event) {
    event.preventDefault();
    console.log(JSON.stringify(this.state))
    const path = "https://localhost:44307/api/Auth/register";
    await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(this.state),
    }).then(response => response.json()).then(response => {
      console.log(response);
      if (response.userID) {
        console.log(response);
        this.setState({ redirect: true });
        this.render();
      }
      else {
        alert("there was a problem registering");
        window.location.reload();
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let EmailValid = this.state.EmailValid;
    let PhoneNumberValid = this.state.PhoneNumberValid;
    let FirstNameValid = this.state.FirstNameValid;
    let LastNameValid = this.state.LastNameValid;
    switch (fieldName) {
      case 'Email':
        EmailValid = value.length > 0 && value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g);
        fieldValidationErrors.Email = EmailValid ? '' : ' is invalid';
        break;
      case 'PhoneNumber':
        PhoneNumberValid = value.length <= 14 && value.length >= 10 && value.match(/^\d+(?:\.\d\d)*$/g);
        fieldValidationErrors.PhoneNumber = PhoneNumberValid ? '' : ' is invalid';
        break;
      case 'FirstName':
        FirstNameValid = value.length >= 0 && value.length <= 25;
        fieldValidationErrors.FirstName = FirstNameValid ? '' : ' is invalid';
        break;
      case 'LastName':
        LastNameValid = value.length >= 0 && value.length <= 25;
        fieldValidationErrors.LastName = LastNameValid ? '' : ' is invalid';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      EmailValid: EmailValid,
      PhoneNumberValid: PhoneNumberValid,
      FirstNameValid: FirstNameValid,
      LastNameValid: LastNameValid
    }, this.validateForm);
  }
  validateForm() {
    this.setState({ formValid: this.state.NameValid && this.state.PriceValid });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
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
                <div className="panel panel-default ml-3">
                  <FormErrors formErrors={this.state.formErrors} />
                </div>
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
                    <input type="text" className="form-control" placeholder="Phone number" name="PhoneNumber"
                      onChange={this.handleInputChange} value={this.state.PhoneNumber} required />
                  </label>
                </div>
                <div className="form-group">
                  <label className="col-md-8">Password
                    <input type="password" name="password" className="form-control" placeholder="Password"
                      onChange={this.handleInputChange} value={this.state.Password} required />
                  </label>
                </div>
                <div className="form-group">
                  <label className="col-md-8"> Role
                    <select name="userTypeID" className="form-control" placeholder="Choose a role"
                      onChange={this.handleInputChange} value={this.state.userTypeID} required>
                      <option value="1">House owner</option>
                      <option value="2">Contractor</option>
                    </select>
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