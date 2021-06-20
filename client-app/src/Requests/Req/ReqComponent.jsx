import React from "react"
import moment from "moment";
import { Link } from "react-router-dom";
import { Prompt } from 'react-st-modal';
function ReqComponent(props) {
    return (
        <main>
            <div className="border border-primary rounded m-1 ml-4">
                <div className="row col-md-12">
                    <div className="row">
                        <span className="col-md-4">
                            Advertisement:
                            <Link to={`/AdView/${props.props.advertisement.advertisementID}`}>
                                {props.props.advertisement.name}
                            </Link>
                        </span>
                    </div>

                    <div className="row">
                        <span className="col-md-3">
                            Status: {props.props.state.stateName}
                        </span>
                    </div>
                    <div className="row">
                        <span className="col-2 mb-2 ">From: {moment(props.props.advertisement.startDate).format('L')}</span>
                        <span className="col-2 ml-3 mb-2 ">Until: {moment(props.props.advertisement.endDate).format('L')}</span>
                        <span className="col-2 ml-3 mb-2 ">Price: {props.props.advertisement.price} $</span>
                    </div>

                </div>
                <div className="row col-md-12 m-1">
                    <button type="button" className="btn btn-outline-danger col-md-2" onClick={(e) => this.changeState(props.props.requestID, e)}>Delete</button>
                    <button type="button" className="btn btn-outline-warning col-md-2 ml-2" onClick={async () => {
                        const result = await Prompt('Change your message', { defaultValue: props.props.comment });

                        if (result) {
                            props.edit(result);
                        } else {
                        }
                    }}>Edit</button>
                </div>
            </div>
        </main>
    )
}
export default ReqComponent