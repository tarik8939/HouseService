import React, { Component } from 'react'
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";
export default class Ad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.dataParent
        }
    }

    changeStatus = (item) => {
        let statusID;
        if (item.statusID == 1)
            statusID = 2
        else if (item.statusID == 2)
            statusID = 1

        const path = `https://localhost:44307/api/Advertisement/changeStatus/${item.advertisementID}/${statusID}`;
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

    load() {
        const path = `https://localhost:44307/api/Advertisement/getById/${this.state.data.advertisementID}`;
        axios.get(path).then((response) => {
            const data = response.data;
            this.setState({ data });
            console.log(this.state)
            console.log(response)
        });
    }

    render() {
        const { data } = this.state;

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


        return (
            <div className="border border-primary rounded m-1 ml-4">
                <div className="row">
                    <span className="col-4 ml-3 mt-2"><h5>{data.name}</h5></span>
                    <span className="col-6"></span>
                    <span className="text-success col-1 ml-5  mt-2">{data.price}$</span>
                </div>
                <div className="row">
                    <p className="col-11 ml-3 mt-2">{data.description}</p>
                    <p className="col-11 ml-3 ">Status: {data.status.statusName}</p>
                </div>


                <div className="row">
                    <span className="text-primary col-2 ml-3 mb-2 ">{data.user.fullName}</span>
                    <span className="col-2 ml-3 mb-2 ">From: {moment(data.startDate).format('L')}</span>
                    <span className="col-2 ml-3 mb-2 ">Until: {moment(data.endDate).format('L')}</span>
                    <span className="col-3"></span>
                    <span className="col-2 pl-7 ml-3 mb-2 ">
                        <Link to={`/AdView/${data.advertisementID}`}>
                            Details
                        </Link>
                        {renderBtn(data)}
                    </span>
                </div>
            </div>
        )
    }
}
