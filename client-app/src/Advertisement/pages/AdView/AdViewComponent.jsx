import React from "react"
import { Link } from "react-router-dom";
import moment from "moment";
import ReqForAd from "../../../Requests/components/ReqForAd";
import NewRequest from "../../../Requests/components/NewRequest";

function AdViewComponent(props) {
const renderBtn = () => {
    if (props.Ad.status === 3) {
        return (
          <input type="button" value="Work Done" className="btn col-md-12 btn-primary text-center" onClick={(e) => props.workDone(props.Ad, e)}></input>
        )
    }
    else if (props.Ad.status === 2 || props.Ad.status === 1) {
      return (
        <Link type="button" value="Edit" className="btn col-md-12 btn-primary text-center" to={`/editAd/${props.Ad.advertisementID}`}> Edit</Link>
      )
  }
  else if (props.Ad.status === 4 ) {
    return (
      <h1>Work done!</h1>
    )
}
}
const ForHouseOwner = () => {
  if (props.Ad.userID === props.user.userID) {
    return (
      <div>
        {renderBtn()}
        <div className="row justify-content-center mt-4">
          {props.Ad.requests.filter(x => x.stateID == 1 || x.stateID == 3).map((item, index) => (
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
      <NewRequest userID={props.user.userID} advertisementID={props.Ad.advertisementID} />
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
            <h2>{props.Ad.name}</h2>
            <hr style={{ border: 'none', height: '3px', backgroundColor: 'grey' }}></hr>
            <span>{props.Ad.description}</span>
          </div>
          <div className="row justify-content-start mt-4">
            <span className="col-4 text-primary">Owner: {props.Ad.user.fullName}</span>
            <span className="col-1"></span>

          </div>
          <div className="row justify-content-start mt-4">
            <span className="col-4">Address: {props.Ad.address}</span>
          </div>
          <div className="row justify-content-start mt-4">
            <span className="col-md-4">Accomplish From:{moment(props.Ad.startDate).format('L')}  </span>
            <span className="col-md-2">Until:{moment(props.Ad.endDate).format('L')}</span>
            <span className="col-md-4"></span>
            <span className=" col-md-2 text-success">{props.Ad.price}$</span>
          </div>
          <div className="row justify-content-center mt-4">
            {ForHouseOwner()}
            {ForContractor()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdViewComponent