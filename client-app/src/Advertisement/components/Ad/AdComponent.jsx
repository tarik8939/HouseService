import React from "react"
import moment from "moment";
import { Link } from "react-router-dom";
import { Text } from "reactstrap";
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
        <p className="col-11 ml-3 ">Status: {data.status.statusName}</p>
      )
    }
  }


  return (
    <div className="border border-primary rounded m-1 ml-4" key={props.key}>
      <div className="row">
        <span className="col-8 ml-3 mt-2"><LinesEllipsis
          text={data.name}
          maxLine='1'
          ellipsis='...'
          basedOn='letters'
          className="h3"
        /></span>
        <span className="col-2"></span>
        <span className="text-success fs-2 mt-1 col-1 ml-5 ">{data.price}$</span>
      </div>
      <div className="row">
        <LinesEllipsis
          text={data.description}
          maxLine='2'
          ellipsis='...'
          basedOn='words'
          className="col-10 ml-3 mt-1 mb-2"
        />
        {renderStatus(data)}
      </div>
      <div className="row">
        <span className="text-primary col-2 ml-3 mb-2 ">{data.user.fullName}</span>
        <span className="col-2 ml-3 mb-2 ">From: {moment(data.startDate).format('L')}</span>
        <span className="col-2 ml-3 mb-2 ">Until: {moment(data.endDate).format('L')}</span>
        <span className="col-3"></span>
        <span className="col-2 mb-2 ">
          <div className="row">
            <div className="col-6">
              {renderBtn(data)}
            </div>
            <div className="col-6">
              <Link to={`/AdView/${data.advertisementID}`} className="btn btn-primary text-center">
                Details
              </Link>
            </div>
          </div>
        </span>
      </div>
    </div>
  )
}

export default AdComponent