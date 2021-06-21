import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import EditAdComponent from './EditAdComponent';

export class EditAd extends Component {
    static displayName = EditAd.name;
    constructor(props) {
        super(props)
        this.state = {
            Ad: null,
            name: "",
            description: "",
            address: "",
            startDate: null,
            endDate: null,
            price: "",
            formErrors: { name: '', price: '', description: '' },
            NameValid: false,
            PriceValid: false,
            formValid: false,
            redirect: false
        }
        this.Submit = this.Submit.bind(this);
        this.handleName = this.handleName.bind(this);
        this.setState = this.setState.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.validateField = this.validateField.bind(this);
        this.errorClass = this.errorClass.bind(this);
    }

    handleName(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        }, () => {this.validateField(name, value)});
        console.log(this.state);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        var path = `https://localhost:44307/api/Advertisement/getById/${id}`;
        axios.get(path).then(response => {
            const Ad = response.data;
            this.setState({
                name: Ad.name,
                description: Ad.description,
                address: Ad.address,
                price: Ad.price,
                Ad: Ad,
            })
            console.log(Ad)
        });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let NameValid = this.state.NameValid;
        let PriceValid = this.state.PriceValid;

        switch (fieldName) {
            case 'name':
                NameValid = value.length <= 30 && value.length >= 5;
                fieldValidationErrors.name = NameValid ? '' : ' is invalid';
                break;
            case 'description':
                NameValid = value.length <= 500 && value.length >= 10;
                fieldValidationErrors.description = NameValid ? '' : ' is invalid';
                break;
            case 'price':
                PriceValid = value.length >= 0 && value.match(/^\d+(?:\.\d\d)*$/g);
                fieldValidationErrors.price = PriceValid ? '' : ' is invalid';
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

    Submit(event) {
        event.preventDefault();
        const path = `https://localhost:44307/api/Advertisement/edit/${this.state.Ad.advertisementID}`;
        axios
            .put(path, {
                name: this.state.name,
                description: this.state.description,
                address: this.state.address,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                price: this.state.price,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log(response);
                this.setState({ redirect: true });
                this.render();
            })
            .catch((error) => {
                console.log(error);
            });

        console.log(JSON.stringify(this.state))
    }




    render() {
        if (this.state.redirect) {
            return (<Redirect to={`/AdView/${this.state.Ad.advertisementID}`} />);
        }
        if (this.state.Ad) {
            return (
                <EditAdComponent state={this.state}
                    Submit={this.Submit}
                    handleName={this.handleName}
                    setState={this.setState}
                    errorClass={this.errorClass}
                    validateForm={this.validateForm}
                    validateField={this.validateField}
                />
            );
        }
        else {
            return (
                <p>Loading...</p>
            )
        }

    }
}
