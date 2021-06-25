import React from "react"
import moment from "moment";
import { Link } from "react-router-dom";
import { Prompt } from 'react-st-modal';
import LinesEllipsis from 'react-lines-ellipsis'
function ReqComponent(props) {
  const renderBtn = () => {
    if (props.req.stateID !== 3) {
      return (
        <div>
          <button type="button" className="btn btn-danger text-light col-md-2" onClick={(e) => props.changeState(props.req.requestID, e)}>Delete</button>
          <button type="button" className="btn btn-warning text-light col-md-2 ml-2" onClick={async () => {
            const result = await Prompt('Change your message', { defaultValue: props.req.comment });

            if (result) {
              props.edit(result);
            } else {
            }
          }}>Edit</button>
        </div>
      )
    }
  }

  return (
    <main>
      <div className="border border-primary rounded m-1 ml-4 container">
          <div className="row mt-2">
            <span className="col-2 fs-5 text-right" >Advertisement:</span>
            <Link className="col-7 fs-5 text-left" to={`/AdView/${props.req.advertisement.advertisementID}`}>
              <LinesEllipsis
                text={props.req.advertisement.name}
                maxLine='1'
                ellipsis='...'
                basedOn='letters'
              />
            </Link>
            <span className="col-3 fs-6 text-right">
              Status: {props.req.state.stateName}
            </span>
          </div>
          <div className="row mt-2">
            <span className="col-2 fs-5 text-right">Comment:   </span>
            <LinesEllipsis
              text={props.req.comment}
              maxLine='1'
              ellipsis='...'
              basedOn='words'
              className="col-6 fs-5 text-left"
            />
            <span className="col-3  ml-5 fs-5 text-right text-success">{props.req.advertisement.price} $</span>
          </div>
          <div className="row mb-2 mt-2">
            <span className="col-3 ml-3 fs-5">From: {moment(props.req.advertisement.startDate).format('L')}</span>
            <span className="col-3  fs-5">Until: {moment(props.req.advertisement.endDate).format('L')}</span>
            <div className="col-5 ml-5 text-right">
            {renderBtn()}
            </div>
          </div>
      </div>
    </main>
  )
}
export default ReqComponent