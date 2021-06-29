import React from "react"
import moment from "moment";
import { Link } from "react-router-dom";
import { Prompt } from 'react-st-modal';
import LinesEllipsis from 'react-lines-ellipsis'
function ReqComponent(props) {
  const renderBtn = () => {
    if (props.req.stateID !== 3 && props.req.stateID !== 2) {
      return (
        <div className="row">
          <div className="col-auto">
            <button type="button" className="btn btn-danger text-light" onClick={(e) => props.changeState(props.req.requestID, e)}>Delete</button>
          </div>
          <div className="col-auto">
            <button type="button" className="btn btn-warning text-light" onClick={async () => {
              const result = await Prompt('Change your message', { defaultValue: props.req.comment });

              if (result) {
                props.edit(result);
              } else {
              }
            }}>Edit</button>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="border border-primary rounded m-1 container-fluid" key={props.key}>
      <div className="row mt-2">
        <Link className="col-lg-10 col-11" to={`/AdView/${props.req.advertisement.advertisementID}`}>
          <LinesEllipsis
            text={props.req.advertisement.name}
            maxLine='1'
            ellipsis='...'
            basedOn='letters'
            className='h3'
          />
        </Link>
        <span className="text-success fs-3 col-auto col-lg-2 text-right">{props.req.advertisement.price}$</span>
      </div>
      <div className="row mt-1">
        <p className="col-10 lead fs-5"><strong>Your comment: </strong>{props.req.comment}</p>
      </div>
      <div className="row">
        <p className="col-auto lead fs-5">
        <strong>State: </strong>{props.req.state.stateName}
        </p>
      </div>
      <div className="row mt-2 mb-1">
        <span className="col-auto fs-6">From: {moment(props.req.advertisement.startDate).format('L')}</span>
        <span className="col-auto fs-6">Until: {moment(props.req.advertisement.endDate).format('L')}</span>
      </div>
      <div className="row mt-2 mb-1">
        {renderBtn()}
      </div>
    </div>
  )
}
export default ReqComponent