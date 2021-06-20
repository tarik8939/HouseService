import React, { Component } from 'react'
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
export class AllReq extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Reqs: [],
        }
    }

    componentDidMount() {
        const userID = this.props.user.userID;
        const path = `https://localhost:44307/api/Request/getByUserId/${userID}`;
        axios.get(path).then((response) => {
            const Reqs = response.data.filter(x => x.stateID != 2);
            this.setState({ Reqs });
            console.log(this.state.Reqs)
        });
    }

    changeState(id) {
        alert(id)
        const path = `https://localhost:44307/api/Request/delete/${id}`;

        axios.delete(path).then(response => {
            console.log(response)
            let Reqs = this.state.Reqs.filter(x => x.requestID != id)
            this.setState({ Reqs });
        })

    }

    render() {
        return (
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                    <h1 className="text-center">My requests</h1>
                    {this.state.Reqs.map((item, index) => (
                        <div className="row" key={index}>
                            <div className="border border-primary rounded m-1 ml-4">
                                <div className="row col-md-12">
                                    <div className="row">
                                        <span className="col-md-4">
                                            Advertisement: {item.advertisement.name}
                                        </span>
                                    </div>

                                    <div className="row">
                                        <span className="col-md-3">
                                            Status: {item.state.stateName}
                                        </span>
                                    </div>
                                    {/* <div className="row">
                                        <span className="col-2 mb-2 ">From: {moment(item.advertisement.startDate).format('L')}</span>
                                        <span className="col-2 ml-3 mb-2 ">Until: {moment(item.advertisement.endDate).format('L')}</span>
                                        <span className="col-2 ml-3 mb-2 ">Price: {item.advertisement.price} $</span>
                                    </div> */}

                                </div>
                                <div className="row col-md-12 m-1">
                                    <button type="button" className="btn btn-outline-danger col-md-2" onClick={(e) => this.changeState(item.requestID, e)}>Delete</button>
                                </div>
                            </div>

                        </div>
                    ))}

                </div>
            </div>
        )
    }
}
