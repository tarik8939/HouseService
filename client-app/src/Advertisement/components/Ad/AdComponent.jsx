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
    // else {
    //   return (
    //     <div className="col-md-3 col-xs-3 col-lg-3 col-sm-3"></div>
    //     <label className="col-md-3 col-xs-3 col-lg-3 col-sm-3">                     </label>
    //   )
    // }
  }
  const renderStatus = (item) => {
    if (item.status != null) {
      return (
        <p className=" fs-6">Status: {data.status.statusName}</p>
      )
    }
  }


  //return (
  // <div className="border border-primary rounded m-1 ml-4 container-fluid" key={props.key}>
  //   <div className="row mt-2">
  //     <span className="col-md-10 col-xs-10 col-lg-10 col-sm-10"><LinesEllipsis
  //       text={data.name}
  //       maxLine='1'
  //       ellipsis='...'
  //       basedOn='letters'
  //       className="h3"
  //     /></span>
  //     {/* <span className="col-2"></span> */}
  //     <span className="text-success fs-2 col-md-1 col-xs-1 col-lg-1 col-sm-1 ml-5">{data.price}$</span>
  //   </div>
  //   <div className="row mt-1 mb-2">
  //     <LinesEllipsis
  //       text={data.description}
  //       maxLine='2'
  //       ellipsis='...'
  //       basedOn='words'
  //       className="col-md-10 col-xs-10 col-lg-10 col-sm-10"
  //     />
  //   </div>
  //   <div className="row mt-1 mb-1">
  //     <span className="text-primary col-md-2 col-xs-2 col-lg-2 col-sm-2 mt-1 ">{data.user.fullName}</span>
  //     <span className="col-md-2 col-xs-2 col-lg-2 col-sm-2 mt-1">From: {moment(data.startDate).format('L')}</span>
  //     <span className="col-md-2 col-xs-2 col-lg-2 col-sm-2 mt-1">Until: {moment(data.endDate).format('L')}</span>
  //     <span className="col-md-3 col-xs-3 col-lg-3 col-sm-3">
  //       {renderStatus(data)}
  //     </span>
  //     <div className="col-md-12 col-xs-12 col-lg-3 col-sm-12">
  //       {/* <div className="row">
  //         <div className="col-md-6 col-xs-6 col-lg-6 col-sm-6">
  //           {renderBtn(data)}
  //         </div>
  //         <div className="col-md-6 col-xs-6 col-lg-6 col-sm-6">
  //           <Link to={`/AdView/${data.advertisementID}`} className="btn btn-primary text-center">
  //             Details
  //           </Link>
  //         </div>
  //       </div> */}
  //       <div className="btn-toolbar">

  //         <span >
  //           {renderBtn(data)}
  //         </span>
  //         <div className="ml-2">
  //           <Link to={`/AdView/${data.advertisementID}`} className="btn btn-primary text-center">
  //             Details
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>
  //)

  return (
    <div className="border border-primary rounded m-1 ml-4 container" key={props.key}>
      <div className="row mt-2">
        <span className="col-md-10 col-xs-10 col-lg-10 col-sm-10"><LinesEllipsis
          text={data.name}
          maxLine='1'
          ellipsis='...'
          basedOn='letters'
          className="h3"
        /></span>
        {/* <span className="col-2"></span> */}
        <span className="text-success fs-2 col-md-1 col-xs-1 col-lg-1 col-sm-1">{data.price}$</span>
      </div>
      <div className="row mt-1 mb-2">
        <LinesEllipsis
          text={data.description}
          maxLine='2'
          ellipsis='...'
          basedOn='words'
          className="col-md-10 col-xs-10 col-lg-10 col-sm-10"
        />
      </div>
      <div className="row mt-2 mb-1">
        <span className="text-primary col-md-2 col-xs-2 col-lg-2 col-sm-2 ">{data.user.fullName}</span>
        <span className="col-md-2 col-xs-2 col-lg-2 col-sm-2 ">From: {moment(data.startDate).format('L')}</span>
        <span className="col-md-2 col-xs-2 col-lg-2 col-sm-2 ">Until: {moment(data.endDate).format('L')}</span>
        <span className="col-md-3 col-xs-3 col-lg-3 col-sm-3">
          {renderStatus(data)}
        </span>
        <span className="col-md-2 col-xs-2 col-lg-2 col-sm-2 ">
          <div className="row">
            <div className="col-md-6 col-xs-6 col-lg-6 col-sm-6 ">
              {renderBtn(data)}
            </div>
            <div className="col-md-6 col-xs-6 col-lg-6 col-sm-6 ">
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