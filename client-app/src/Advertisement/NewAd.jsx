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
            formValid: false
        };
        this.Submit = this.Submit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.PostAd = this.PostAd.bind(this);
    }
    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }
    async componentDidMount() {
      const path = 'https://localhost:44307/api/Auth/user';
      await fetch(path,  {
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then(response => response.json())
      .then(response => {
      
          this.setState({isAuthenticated:true, userID:response.userID});
          this.render();
      
      })
    }
    PostAd() {
        const path = "https://localhost:44307/api/Auth/user";
        axios
            .post(path, JSON.stringify(this.state), {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    Submit(event) {
        event.preventDefault();
        // delete this.state.focusedInput;
        // delete this.state.isAuthenticated;
        // const host = window.location.host;
        // const path2 = `https://${host}/api/Status/${this.state.userName}`;
        // axios.get(path2).then((response) => {
        //     const userID = response.data;
        //     this.setState({ userID });
        //     console.log(`${this.state.userID}`);
        //     this.PostAd();
        // });
        // console.log(JSON.stringify(this.state));
        const path = "https://localhost:44307/api/Advertisement/create";
        axios
            .post(path, JSON.stringify(this.state), {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log(response);
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
        return (
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <form onSubmit={this.Submit}>
                        <h2>Make a new ad</h2>
                        <div className="panel panel-default">
                            <FormErrors formErrors={this.state.formErrors} />
                        </div>
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
                        <input type="submit" value="Send" disabled={!this.state.formValid} />
                    </form>
                </div>
            </div>

        );
    }
}
