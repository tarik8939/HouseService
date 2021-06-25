import React from "react"
import moment from "moment";
import { Link } from "react-router-dom";
import { Prompt } from 'react-st-modal';
function ReqComponent(props) {
    const renderBtn = () => {
        if (props.req.stateID !== 3) {
            return (
              <div className="row col-md-12 m-1">
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
            <div className="border border-primary rounded m-1 ml-4">
                <div className="row col-md-12">
                    <div className="row">
                        <span className="col-md-4">
                            Advertisement:
                            <Link to={`/AdView/${props.req.advertisement.advertisementID}`}>
                                {props.req.advertisement.name}
                            </Link>
                        </span>
                        <span className="col-md-4">
                        <p>Comment: {props.req.comment}</p>
                      </span>
                    </div>

                    <div className="row">
                        <span className="col-md-3">
                            Status: {props.req.state.stateName}
                        </span>
                    </div>
                    <div className="row">
                        <span className="col-2 mb-2 ">From: {moment(props.req.advertisement.startDate).format('L')}</span>
                        <span className="col-2 ml-3 mb-2 ">Until: {moment(props.req.advertisement.endDate).format('L')}</span>
                        <span className="col-2 ml-3 mb-2 ">Price: {props.req.advertisement.price} $</span>
                    </div>

                </div>
                {renderBtn()}
            </div>
        </main>
    )
}
export default ReqComponent