import React, { Component } from 'react'
import axios from 'axios';
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import {
    DateRangePicker,
    SingleDatePicker,
    DayPickerRangeController
} from "react-dates";
import { Redirect } from 'react-router-dom';

export class EditAd extends Component {
    static displayName = EditAd.name;
    constructor(props) {
        super(props)
        this.state = {
            Ad: null,
            loaded: false,
            name: "",
            description: "",
            address: "",
            startDate: null,
            endDate: null,
            price: "",
            userID: null
        }
        // this.handleInput = this.handleInput.bind(this);
    }

    handleName(event) {
        // event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
        console.log(this.state);
        // console.log(this.state.Ad.name);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        var path = `https://localhost:44307/api/Advertisement/getById/${id}`;
        axios.get(path).then(response => {
            const Ad = response.data;
            const loaded = true
            // this.setState({ Ad, loaded })
            this.setState({
                name: Ad.name,
                description: Ad.description,
                address: Ad.address,
                // startDate: Ad.startDate,
                // endDate: Ad.endDate,
                price: Ad.price,
                userID: Ad.userID,
                loaded: loaded,
                Ad: Ad,
                redirect: false
            })
            console.log(Ad)
        });
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
                userID: this.state.userID,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log(response);
                this.setState({redirect:true});
                this.render();
            })
            .catch((error) => {
                console.log(error);
            });

        console.log(JSON.stringify(this.state))
    }




    render() {
        if (this.state.redirect){
        return (<Redirect to={`/AdView/${this.state.Ad.advertisementID}`} />);}
        if (this.state.loaded === false) {
            return this.loadingView()
        }
        else {
            return this.isLoadView()
        }

    }
    loadingView() {
        return (
            <p>Loading...</p>
        )
    }
    isLoadView() {
        return (
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <form>
                        <div className="form-group">
                            <label className="col-md-8">
                                Name:
                                <input name="name" className="form-control"
                                    type="text" value={this.state.name}
                                    onChange={(e) => this.handleName(e)}
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="col-md-8">
                                Description:
                                <input name="description" className="form-control"
                                    type="text" value={this.state.description}
                                    onChange={(e) => this.handleName(e)}
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="col-md-8">
                                Address:
                                <input name="address" className="form-control"
                                    type="text" value={this.state.address}
                                    onChange={(e) => this.handleName(e)}
                                />
                            </label>
                        </div>
                        <div className="form-group" >
                            <label className="col-md-8">
                                Date range:<br />
                                <DateRangePicker
                                    //   className="form-control"
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
                        <div className="form-group">
                            <label className="col-md-8">
                                Price:
                                <input name="price" className="form-control"
                                    type="text" value={this.state.price}
                                    onChange={(e) => this.handleName(e)}
                                />
                            </label>
                        </div>
                        <input type="submit" value="Send" onClick={(e) => this.Submit(e)}
                            className="btn col-md-8 btn-primary text-center" />
                    </form>
                </div>
            </div>


        )
    }
}
