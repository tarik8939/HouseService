import React from "react"
import { Link } from "react-router-dom";
import moment from "moment";
import ReqForAd from "../../../Requests/components/ReqForAd";
import NewRequest from "../../../Requests/components/NewRequest";
import Rating from 'react-simple-star-rating'

function AdViewComponent(props) {

  const renderBtn = () => {
    if (props.state.Ad.statusID === 3) {
      return (
        <div>
          <div className="row mb-2">
            <p className="col-auto">Please, rate your contractor</p>
            <Rating
            onClick={props.handleChange}
            ratingValue={props.state.rating}
            size={20}
            label
            transition
            fillColor='orange'
            emptyColor='gray'
            className="col-auto"/>
          </div>
          <div className="row mb-2">
          <input type="button" value="Work Done" className="btn col-md-12 btn-primary text-center  mb-3" onClick={(e) => props.workDone(props.state.Ad, e)}></input>
          </div>
        </div>
      )
    }
    else if (props.state.Ad.statusID === 2 || props.state.Ad.statusID === 1) {
      return (
        <Link type="button" value="Edit" className="btn col-md-12 btn-primary text-light text-center  mb-3" to={`/editAd/${props.state.Ad.advertisementID}`}> Edit</Link>
      )
    }
    else if (props.state.Ad.statusID === 4) {
      return (
        <div>
          <h1 className="text-center">Work done!</h1>
          <p className="text-center fs-3">Thanks for your mark</p>
        </div>
      )
    }
  }
  const ForHouseOwner = () => {
    if (props.state.Ad.userID === props.user.userID) {
      return (
        <div>
          {renderBtn()}
          <div>
            {props.state.Ad.requests.filter(x => x.stateID == 1 || x.stateID == 3).map((item, index) => (
              <ReqForAd key={index} dataParent={item} />
            ))}
          </div>
        </div>
      );
    }
  }
  const ForContractor = () => {
    if (props.user.userTypeID === 2) {
      return (
        <NewRequest userID={props.user.userID} advertisementID={props.state.Ad.advertisementID} />
      );
    }
  }
  return (
        <div className="container">
          <div className="row mb-2">
            <h2 className="col-lg-9 col-12">{props.state.Ad.name}</h2>
            <span className="fs-3 col-auto col-lg-3 text-right">Price: <a className="text-success">{props.state.Ad.price}$</a></span>
          </div>
          <div className="row mb-2">
          <hr style={{ border: 'none', height: '3px', backgroundColor: 'grey' }}></hr>
          </div>
          <div className="row mb-2">
          <span className="fs-3">{props.state.Ad.description}</span>
          </div>
          <div className="row mb-2">
            <p className="col-auto">Owner: <span className="text-primary">{props.state.Ad.user.fullName}</span></p>
            <span className="col-auto">Address: {props.state.Ad.address}</span>
          </div>
          <div className="row mb-2">
            <p className="col-auto">From: <u>{moment(props.state.Ad.startDate).format('L')}</u> </p>
            <p className="col-auto">Until: <u>{moment(props.state.Ad.startDate).format('L')}</u></p>
          </div>
          <div className="row mb-2">
          <hr style={{ border: 'none', height: '3px', backgroundColor: 'grey' }}></hr>
          </div>
          <div className="row mt-2">
            {ForHouseOwner()}
            {ForContractor()}
          </div>
        </div>
  );
}

export default AdViewComponent