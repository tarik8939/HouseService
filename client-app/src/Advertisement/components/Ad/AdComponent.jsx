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
        <p className="fs-6">Status: {data.status.statusName}</p>
      )
    }
  }

  return (
    <div className="border border-primary rounded m-1 container-fluid" key={props.key}>
      <div className="row mt-2">
        <span className="col-lg-10 col-11"><LinesEllipsis
          text={data.name}
          maxLine='1'
          ellipsis='...'
          basedOn='letters'
          className="h3"
        /></span>
        <span className="text-success fs-3 col-auto col-lg-2 text-right">{data.price}$</span>
      </div>
      <div className="row mt-1 mb-2">
        <span className="col-lg-10 col-11"><LinesEllipsis
          text={data.description}
          maxLine='2'
          ellipsis='...'
          basedOn='letters'
          className="lead"
        /></span>
      </div>
      <div className="row mt-2 mb-1">
        <span className="text-primary col-auto fs-6">{data.user.fullName}</span>
        <span className="col-auto fs-6">From: {moment(data.startDate).format('L')}</span>
        <span className="col-auto fs-6">Until: {moment(data.endDate).format('L')}</span>
        <span className="col-auto fs-6">
          {renderStatus(data)}
        </span>
      </div>
      <div className="row mt-2 mb-1">
          <div className="col-auto">
            <Link to={`/AdView/${data.advertisementID}`} className="btn btn-primary text-center">
              Details
            </Link>
          </div>
          <div className="col-auto">
            {renderBtn(data)}
          </div>
      </div>
    </div>
  )
}

export default AdComponent