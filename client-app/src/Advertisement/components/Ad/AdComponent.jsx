import React from "react"
import moment from "moment";
import { Link } from "react-router-dom";
import LinesEllipsis from 'react-lines-ellipsis'

function AdComponent(props) {
  const data = props.data;

  const renderBtn = (item) => {
    if (item.status != null) {
      if (item.statusID == 1) {
        return (
          <a className="btn btn-danger text-center text-light" onClick={(e) => props.changeStatus(item, e)}>Cancel</a>
        )
      }
      else if (item.statusID == 2) {
        return (
          <a className="btn btn-success text-center text-light" onClick={(e) => props.changeStatus(item, e)}>Publish</a>
        )
      }
    }
    
  }
  const renderStatus = (item) => {
    if (item.status != null) {
      return (
        <p className=" fs-6">Status: {data.status.statusName}</p>
      )
    }
  }

  return (
    <div className="border border-primary rounded m-1 container-fluid" key={props.key}>
      <div className="row mt-2">
        <span className="col-lg-10 col-11 "><LinesEllipsis
          text={data.name}
          maxLine='1'
          ellipsis='...'
          basedOn='letters'
          className="h3"
        /></span>
        {/* <span className="col-2"></span> */}
        <span className="text-success fs-3 col-12 col-lg-1 offset-lg-1">{data.price}$</span>
      </div>
      <div className="row mt-1 mb-2">
        <LinesEllipsis
          text={data.description}
          maxLine='2'
          ellipsis='...'
          basedOn='words'
          className="col-md-10 col-10 col-lg-10 col-sm-10 col-xl-10  lead"
        />
      </div>
      <div className="row mt-2 mb-1">
        <span className="text-primary col-md-2 col-xs-2 col-lg-2 col-sm-2 col-xl-2 fs-6">{data.user.fullName}</span>
        <span className="col-md-2 col-xs-2 col-lg-2 col-sm-2 col-xl-2 fs-6">From: {moment(data.startDate).format('L')}</span>
        <span className="col-md-2 col-xs-2 col-lg-2 col-sm-2 col-xl-2 fs-6">Until: {moment(data.endDate).format('L')}</span>
        <span className="col-md-4 col-4 col-lg-4 col-sm-4 col-xl-2 fs-6">
          {renderStatus(data)}
        </span>
        <div className="col-md-12 col-12 col-lg-3 col-sm-12 col-xl-3 offset-xl-1">
          <div className="row">
            <div className="col-md-6 col-6 col-lg-4 col-sm-6 col-xl-5">
              {renderBtn(data)}
            </div>
            <div className="col-md-6 col-6 col-lg-4 col-sm-6 col-xl-6">
              <Link to={`/AdView/${data.advertisementID}`} className="btn btn-primary text-center">
                Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdComponent