import React, { Component } from 'react'

export default class ReqForAd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.dataParent
        }
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
                        <button type="button" className="btn btn-outline-success col-md-2 mr-2">Accept</button>
                        <button type="button" className="btn btn-outline-danger col-md-2">Decline</button>
                    </div>
                </div>
            </div>
        )
    }
}
