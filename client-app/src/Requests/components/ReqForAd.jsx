import React, { Component } from 'react'
import axios from "axios";
import ReactStars from 'react-stars'

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
      if(data.stateID === 3)
      return(<div ><span className="text-success ml-3">Accepted</span></div>);
    }
    const forUnAccepted = () => {
      if(data.stateID === 1)
      return(
      <div className="row col-md-12 m-1">
        <button type="button" className="btn btn-success text-light col-md-2 mr-2" onClick={(e) => this.changeState(3, e)}>Accept</button>
        <button type="button" className="btn btn-danger text-light col-md-2" onClick={(e) => this.changeState(2, e)}>Decline</button>
      </div>);
    }
    const rating = () => data.user.markCount>0 
    ? <p>Rating: {data.user.rating} ({data.user.markCount})</p> 
    : null
    return (
      <div className="row">
        <div className="border border-primary rounded m-1 ml-4">
          <div className="row col-md-12">
            <span className="col-md-4">
              <p>Contractor: {data.user.fullName}</p>
              {rating()}
            </span>
            <span className="col-md-4">
              <p>Comment: {data.comment}</p>
            </span>
            <span className="col-md-2">
              <p>{data.user.phoneNum}</p>
            </span>
            <span className="col-md-2">
              <p>{data.user.email}</p>
            </span>
          </div>
          {forAccepted()}
          {forUnAccepted()}
        </div>
      </div>
    )
  }
}