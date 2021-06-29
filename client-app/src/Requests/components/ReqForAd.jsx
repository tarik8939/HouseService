import React, { Component } from 'react'
import axios from "axios";
import Rating from 'react-simple-star-rating'

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
    const forAccepted = () => {
      if (data.stateID === 3)
        return (<div className="col-auto"><span className="text-success">Accepted</span></div>);
    }
    const forUnAccepted = () => {
      if (data.stateID === 1)
        return (
          <div className="col-auto">
            <button type="button" className="btn btn-success text-light" onClick={(e) => this.changeState(3, e)}>Accept</button>
            <button type="button" className="btn btn-danger text-light ml-2" onClick={(e) => this.changeState(2, e)}>Decline</button>
          </div>);
    }
    const rating = () => data.user.markCount > 0
      ? <p className="fs-5 text-right">Rating: {data.user.rating} ({data.user.markCount})</p>
      : null
    return (
      <div className="border border-primary rounded m-1 container-fluid">
        <div className="row mb-2 mt-2">
          <div className="col-10">
            <p className="fs-4">Contractor: <span className="text-primary">{data.user.fullName}</span></p>
          </div>
          <div className="col-auto">
            {rating()}
          </div>
        </div>
        <div className="row mb-2">
          <p className="col-11 fs-5">Comment: {data.comment}</p>
        </div>
        <div className="row mb-2">
        <p className="col-auto fs-6">
            Phone Number: {data.user.phoneNum}
          </p>
          <p className="col-auto fs-6">
            Email: {data.user.email}
          </p>
        </div>
        <div className="row mb-2">
          {forAccepted()}
          {forUnAccepted()}
        </div>
      </div>
    )
  }
}