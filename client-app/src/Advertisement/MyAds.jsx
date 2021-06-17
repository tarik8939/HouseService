import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import '../App.css';

export class MyAds extends Component {
    static displayName = MyAds.Name;
    constructor(props) {
        super(props);
        this.state = {
            Ads: [],
            title: "",
            isLoading: false,
        }
    }


    componentDidMount() {
        this.load()
    }
    load() {
        const path = `https://localhost:44307/api/Advertisement/getByUserId/${this.props.user.userID}`;
        axios.get(path).then((response) => {
            const Ads = response.data;
            const isLoading = true;
            this.setState({ Ads, isLoading });
            console.log(this.state)
            console.log(response)
        });
    }
    HandleValueChange(event) {
        event.preventDefault();
        let value = event.target.value;
        this.state.title = value;
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    onSort(event) {
        event.preventDefault();
        let value = event.target.value;
        let items;
        switch (value) {
            case "Name":
                items = this.state.Ads.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
                this.setState({
                    [this.state.Ads]: items
                })
                break;
            case "Price":
                items = this.state.Ads.sort((a, b) => (a.price > b.price) ? 1 : -1)
                this.setState({
                    [this.state.Ads]: items
                })
                break;
            case "Date":
                items = this.state.Ads.sort((a, b) => (a.startDate > b.startDate) ? 1 : -1)
                this.setState({
                    [this.state.Ads]: items
                })
                break;
        }
    }
    changeStatus(item) {
        let statusId;
        if (item.statusID == 1)
            statusId = 2
        else if (item.statusID == 2)
            statusId = 1
        const path = `https://localhost:44307/api/Advertisement/changeStatus/${item.advertisementID}/${statusId}`;
        axios.put(path, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            console.log(response)
            this.load()
        }).catch((error) => {
            console.log(error)
        })

    }


    render() {

        const renderBtn = (item) => {
            if (item.statusID == 1) {
                return (
                    <a className="text-danger ml-2" onClick={(e) => this.changeStatus(item, e)}>Cancel</a>
                )
            }
            else if (item.statusID == 2) {
                return (
                    <a className="text-success ml-2" onClick={(e) => this.changeStatus(item, e)}>Publish</a>
                )
            }
        }

        const RenderAds = () => {
            if (this.state.isLoading == true) {
                return (
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                            {this.state.Ads.filter(ad => ad.name.toLowerCase().includes(this.state.title.toLowerCase())).map((item, index) => (
                                <div key={index} className="border border-primary rounded m-1 ml-4">
                                    <div className="row">
                                        <span className="col-4 ml-3 mt-2"><h5>{item.name}</h5></span>
                                        <span className="col-6"></span>
                                        <span className="text-success col-1 ml-5  mt-2">{item.price}$</span>
                                    </div>
                                    <div className="row">
                                        <p className="col-11 ml-3 mt-2">{item.description}</p>
                                        <p className="col-11 ml-3 ">Status: {item.status.statusName}</p>
                                    </div>


                                    <div className="row">
                                        <span className="text-primary col-2 ml-3 mb-2 ">{item.user.fullName}</span>
                                        <span className="col-2 ml-3 mb-2 ">From: {moment(item.startDate).format('L')}</span>
                                        <span className="col-2 ml-3 mb-2 ">Until: {moment(item.endDate).format('L')}</span>
                                        <span className="col-3"></span>
                                        <span className="col-2 pl-7 ml-3 mb-2 ">
                                            <Link to={`/AdView/${item.advertisementID}`}>
                                                Details
                                            </Link>
                                            {renderBtn(item)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                )
            } else {
                return (
                    <p className="text-center">Please wait while the ads are loading</p>
                )
            }
        }

        return (
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                    <label className=" mr-2">Search by title </label>
                    <input type="text" name="title"
                        className="col-md-6 rounded ml-1 mr-2"
                        value={this.state.title}
                        onChange={(e) => this.HandleValueChange(e)}>
                    </input>
                    <label className="ml-5 mr-2">Sort by </label>
                    <select className="col-md-3 rounded ml-1" onChange={(e) => this.onSort(e)}>
                        <option value="Select parametr for sort" defaultValue >Select parametr for sort </option>
                        <option value="Name">Name</option>
                        <option value="Price">Price</option>
                        <option value="Date">Date</option>
                    </select>
                    <p className="col-md-3">{this.state.Ads.filter(ad => ad.name.toLowerCase().includes(this.state.title.toLowerCase())).length} searched results</p>
                </div>

                <div className="col-md-3"></div>
                {RenderAds()}
            </div>
        );
    }
}


