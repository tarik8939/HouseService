import React, { Component } from "react";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
export class AdView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Ad: null,
            loaded: false
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        var path = `https://localhost:44307/api/Advertisement/getById/${id}`;
        axios.get(path).then(response => {
            const Ad = response.data;
            const loaded = true
            this.setState({ Ad, loaded })
            console.log(this.state.Ad)
            console.log(this.state.loaded)
        });
    }
    render() {
        if (this.state.loaded == false) {
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
            <div className="container">
                <div className="row">
                    <div className="col-lg-2">
                        {/* <span>Picture place</span> */}
                    </div>
                    <div className="col-lg-8">
                        <div>
                            <h2>{this.state.Ad.name}</h2>
                            <hr style={{ border: 'none', height: '3px', backgroundColor: 'grey' }}></hr>
                            <span>{this.state.Ad.description}</span>
                        </div>
                        <div className="row justify-content-start">
                            <span className="col-4 text-primary">Owner: {this.state.Ad.user.fullName}</span>
                            <span className="col-1"></span>

                        </div>
                        <div className="row justify-content-start">
                            <span className="col-4">Address: {this.state.Ad.address}</span>
                        </div>

                        <div className="row justify-content-start">
                            <span className="col-md-4">Accomplish From:{moment(this.state.Ad.startDate).format('L')}  </span>
                            <span className="col-md-2">Until:{moment(this.state.Ad.endDate).format('L')}</span>
                            <span className="col-md-4"></span>
                            <span className=" col-md-2 text-success">{this.state.Ad.price}$</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}