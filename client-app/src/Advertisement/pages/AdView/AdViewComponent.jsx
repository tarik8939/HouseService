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
          <Rating
            onClick={props.handleChange}
            ratingValue={props.state.rating}
            size={20}
            label
            transition
            fillColor='orange'
            emptyColor='gray'
          />
          <input type="button" value="Work Done" className="btn col-md-12 btn-primary text-center mt-2" onClick={(e) => props.workDone(props.state.Ad, e)}></input>
        </div>
      )
    }
    else if (props.state.Ad.statusID === 2 || props.state.Ad.statusID === 1) {
      return (
        <Link type="button" value="Edit" className="btn col-md-12 btn-primary text-center" to={`/editAd/${props.state.Ad.advertisementID}`}> Edit</Link>
      )
    }
    else if (props.state.Ad.statusID === 4) {
      return (
        <div>
          <h1>Work done!</h1>
          <h1>Thanks for your mark</h1>
        </div>
      )
    }
  }
  const ForHouseOwner = () => {
    if (props.state.Ad.userID === props.user.userID) {
      return (
        <div>
          {renderBtn()}
          <div className="row justify-content-center mt-4">
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
      <div className="row">
        <div className="col-lg-2">
          {/* <span>Picture place</span> */}
        </div>
        <div className="col-lg-8">
          <div>
            <div className="row">
              <h2 className="col-lg-8">{props.state.Ad.name}</h2>
              <span className="fs-3 col-lg-4 text-right">Price: <a className="text-success">{props.state.Ad.price}$</a></span>
            </div>
            <hr style={{ border: 'none', height: '3px', backgroundColor: 'grey' }}></hr>
            <span>{props.state.Ad.description}</span>
          </div>
          <div className="row justify-content-start mt-4">
            <span className="col-4 text-primary">Owner: {props.state.Ad.user.fullName}</span>
            <span className="col-1"></span>

          </div>
          <div className="row justify-content-start mt-4">
            <span className="col-4">Address: {props.state.Ad.address}</span>
          </div>
          <div className="row justify-content-start mt-4">
            <span className="col-5">Accomplish from: {moment(props.state.Ad.startDate).format('L')}  </span>
            <span className="col-2">Until:{moment(props.state.Ad.endDate).format('L')}</span>
            <span className="col-5"></span>
          </div>
          <div className="row mt-4">
            {ForHouseOwner()}
            {ForContractor()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdViewComponent