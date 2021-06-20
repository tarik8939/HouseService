import React from "react"
import moment from "moment";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController
} from "react-dates";

function EditAdComponent(props) {
  return (
    <div className="row">
      <div className="col-md-3"></div>
      <div className="col-md-6">
        <form>
          <div className="form-group">
            <label className="col-md-8">
              Name:
              <input name="name" className="form-control"
                type="text" value={props.state.name}
                onChange={(e) => props.handleName(e)}
              />
            </label>
          </div>
          <div className="form-group">
            <label className="col-md-8">
              Description:
              <input name="description" className="form-control"
                type="text" value={props.state.description}
                onChange={(e) => props.handleName(e)}
              />
            </label>
          </div>
          <div className="form-group">
            <label className="col-md-8">
              Address:
              <input name="address" className="form-control"
                type="text" value={props.state.address}
                onChange={(e) => props.handleName(e)}
              />
            </label>
          </div>
          <div className="form-group" >
            <label className="col-md-8">
              Date range:<br />
              <DateRangePicker
                //   className="form-control"
                startDate={props.state.startDate} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={props.state.endDate} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={({ startDate, endDate }) =>
                  props.setState({ startDate, endDate })
                } // PropTypes.func.isRequired,
                focusedInput={props.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={(focusedInput) => props.setState({ focusedInput })} // PropTypes.func.isRequired,
              />
            </label>
          </div>
          <div className="form-group">
            <label className="col-md-8">
              Price:
              <input name="price" className="form-control"
                type="text" value={props.state.price}
                onChange={(e) => props.handleName(e)}
              />
            </label>
          </div>
          <input type="submit" value="Send" onClick={(e) => props.Submit(e)}
            className="btn col-md-8 btn-primary text-center" />
        </form>
      </div>
    </div>


  )
}

export default EditAdComponent