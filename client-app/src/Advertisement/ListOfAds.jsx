import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

export class ListOfAds extends Component {
    static displayName = ListOfAds.Name;
    constructor(props) {
        super(props);
        this.state = {
            Ads: [],
            title: "",
            isLoading: false,
        }
    }


    componentDidMount() {
        const path = `https://localhost:44307/api/Advertisement/getAll`;
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


    render() {
        const RenderAds = () => {
            if (this.state.isLoading == true) {
                return (
                    <div className="col-md-6">
                        {this.state.Ads.filter(ad => ad.name.includes(this.state.title)).map((item, index) => (
                            <div key={index} className="border border-primary rounded m-1 ml-4">
                                <div className="row">
                                    <span className="col-md-2"><h5>{item.name}</h5></span>
                                    <span className="text-success col-md-2">{item.price}</span>
                                </div>
                                <div className="row">
                                    <p className="col-2">{item.description}</p>
                                </div>

                                <div className="row">
                                    <span className="text-primary col-2">{item.user.fullName}</span>
                                    <span className="col-3">From: {moment(item.startDate).format('L')}</span>
                                    <span className="col-3">Until: {moment(item.endDate).format('L')}</span>
                                    <span className="col-3">
                                        <Link to={`/AdView/${item.advertisementID}`}>
                                            Details
                                        </Link>
                                    </span>
                                </div>
                            </div>
                        ))}
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
                    <label>Search by title</label>
                    <input type="text" name="title"
                        className="col-md-6 rounded ml-1 mr-2"
                        value={this.state.title}
                        onChange={(e) => this.HandleValueChange(e)}>
                    </input>
                    <label className="ml-5">Sort by</label>
                    <select className="col-md-3 rounded ml-1" onChange={(e) => this.onSort(e)}>
                        <option value="Select parametr for sort" defaultValue >Select parametr for sort</option>
                        <option value="Name">Name</option>
                        <option value="Price">Price</option>
                        <option value="Date">Date</option>
                    </select>
                </div>
                <p className="col-md-10">{this.state.Ads.filter(ad => ad.name.includes(this.state.title)).length} searched result</p>

                <div className="col-md-3"></div>
                {RenderAds()}
            </div>
        );
    }


}