import React, { Component } from "react";
import axios from "axios";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { Redirect } from 'react-router-dom';
import NewAdComponent from './NewAdComponent'




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
            formErrors: { Name: '', Price: '', Description: '' },
            NameValid: false,
            PriceValid: false,
            formValid: false,
            redirect: false,
            redirectId: null,
        };
        this.Submit = this.Submit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.setState = this.setState.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.validateField = this.validateField.bind(this);
        this.errorClass = this.errorClass.bind(this);
    }
    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }
    componentWillMount() {
        if (this.props.loggedInStatus === "LOGGED_IN") {
            this.setState({ isAuthenticated: true, userID: this.props.user.userID });
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
                this.setState({ redirect: true, redirectId: response.data.advertisementID });
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
            case 'Description':
                NameValid = value.length <= 500 && value.length >= 10;
                fieldValidationErrors.Description = NameValid ? '' : ' is invalid';
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
        if (this.state.redirect) {
            return (<Redirect to={`/adView/${this.state.redirectId}`} />);
        }
        if (this.state.isAuthenticated) {
            return (
                <NewAdComponent state={this.state}
                    validateForm={this.validateForm}
                    validateField={this.validateField}
                    Submit={this.Submit}
                    handleInputChange={this.handleInputChange}
                    errorClass={this.errorClass}
                    setState={this.setState}
                />
            );
        }
        else {
            return (<h1>Please Login or Register</h1>)
        }
    }
}
