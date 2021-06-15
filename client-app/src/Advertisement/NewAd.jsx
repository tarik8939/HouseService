import React, { Component } from "react";
import axios from "axios";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import {
    DateRangePicker,
    SingleDatePicker,
    DayPickerRangeController,
} from "react-dates";
import { FormErrors } from './FormErrors';
import { Redirect } from 'react-router-dom';


export class NewAd extends Component {
    static displayName = NewAd.name;
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            Description: "",
            Address: "",
            startDate: null,
            endDate: null,
            Price: "",
            isAuthenticated: false,
            userID: "",
            formErrors: { Name: '', Price: '' },
            NameValid: false,
            PriceValid: false,
            formValid: false,
            redirect: false,
            redirectId: null,
        };
        this.Submit = this.Submit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }
    componentWillMount() {
     if(this.props.loggedInStatus==="LOGGED_IN"){
       this.setState({isAuthenticated:true, userID:this.props.user.userID});
     }
    }
    Submit(event) {
        event.preventDefault();
        const path = "https://localhost:44307/api/Advertisement/create";
        axios.post(path, {
              name: this.state.Name,
              description: this.state.Description,
              address: this.state.Address,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
              price: this.state.Price,
              userID: this.state.userID,
          }, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log(response);
                this.setState({redirect:true, redirectId:response.data.advertisementID});
                this.render();
            })
            .catch((error) => {
                console.log(error);
            });

    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let NameValid = this.state.NameValid;
        let PriceValid = this.state.PriceValid;

        switch (fieldName) {
            case 'Name':
                NameValid = value.length <= 30 && value.length >= 5;
                fieldValidationErrors.Name = NameValid ? '' : ' is invalid';
                break;
            case 'Price':
                PriceValid = value.length >= 0 && value.match(/^\d+(?:\.\d\d)*$/g);
                fieldValidationErrors.Price = PriceValid ? '' : ' is invalid';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            NameValid: NameValid,
            PriceValid: PriceValid
        }, this.validateForm);
    }
    validateForm() {
        this.setState({ formValid: this.state.NameValid && this.state.PriceValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
    render() {
      if (this.state.redirect){
      return (<Redirect to={`/adView/${this.state.redirectId}`} />);}
      if(this.state.isAuthenticated){
        return (
          <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-6 justify-content-center">
                    <form onSubmit={this.Submit}>
                        <h2>Make a new ad</h2>
                        
                        <div className={`form-group ${this.errorClass(this.state.formErrors.Name)}`}>
                            <label className="col-md-8">
                                Name:
                                <input
                                    type="text"
                                    required className="form-control"
                                    name="Name"
                                    value={this.state.Name}
                                    onChange={this.handleInputChange}
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="col-md-8">
                                Description:
                                <input
                                    className="form-control"
                                    type="text"
                                    name="Description"
                                    value={this.state.Description}
                                    onChange={this.handleInputChange}
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="col-md-8">
                                Address:
                                <input
                                    className="form-control"
                                    type="text"
                                    name="Address"
                                    value={this.state.Address}
                                    onChange={this.handleInputChange}
                                />
                            </label>
                        </div>
                        <div className="form-group" >
                            <label className="col-md-8">
                                Date range:<br/>
                                <DateRangePicker
                                    // className="form-control"
                                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                                    onDatesChange={({ startDate, endDate }) =>
                                        this.setState({ startDate, endDate })
                                    } // PropTypes.func.isRequired,
                                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                    onFocusChange={(focusedInput) => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                                />
                            </label>
                        </div>
                        <div className={`form-group ${this.errorClass(this.state.formErrors.Price)}`}>
                            <label className="col-md-8">
                                Price:
                                <input
                                    className="form-control"
                                    type="text"
                                    name="Price"
                                    value={this.state.Price}
                                    onChange={this.handleInputChange}
                                />
                            </label>
                        </div>
                        <input type="submit" value="Send" className="btn col-md-8 btn-primary text-center"  disabled={!this.state.formValid} />
                    </form>
                </div>
            </div>

        );}
        else{
          return(<h1>Please Login or Register</h1>)
        }
    }
}
