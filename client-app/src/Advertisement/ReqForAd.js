import React, { Component } from 'react'
import axios from "axios";

export default class ReqForAd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.dataParent
        }
    }

    changeState(id, e) {
        e.preventDefault()
        const path = `https://localhost:44307/api/Request/changeState/${this.state.data.requestID}/${id}`;
        axios.put(path, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
        window.location.reload();
    }




    render() {
        const { data } = this.state;
        return (
            <div className="row">
                <div className="border border-primary rounded m-1 ml-4">
                    <div className="row col-md-12">
                        <span className="col-md-4">
                            <p>Contractor: {data.user.fullName}</p>
                        </span>
                        <span className="col-md-3">
                            <p>{data.user.phoneNum}</p>
                        </span>
                        <span className="col-md-4">
                            <p>{data.user.email}</p>
                        </span>
                    </div>
                    <div className="row col-md-12 m-1">
                        <button type="button" className="btn btn-outline-success col-md-2 mr-2" onClick={(e) => this.changeState(3, e)}>Accept</button>
                        <button type="button" className="btn btn-outline-danger col-md-2" onClick={(e) => this.changeState(2, e)}>Decline</button>
                    </div>
                </div>
            </div>
        )
    }
}
