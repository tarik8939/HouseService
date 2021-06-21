import React from "react"
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController,
} from "react-dates";


function NewAdComponent(props) {
  console.log('asdas')
  console.log(props)
  return (
    <main>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-6 justify-content-center">
          <form onSubmit={props.Submit}>
            <h2>Make a new ad</h2>

            <div className={`form-group ${props.errorClass(props.data.formErrors.Name)}`}>
              <label className="col-md-8">
                Name:
                <input
                  type="text"
                  required className="form-control"
                  name="Name"
                  value={props.data.Name}
                  onChange={props.handleInputChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label className="col-md-8">
                Description:
                <input
                  className="form-control"
                  type="text"
                  name="Description"
                  value={props.data.Description}
                  onChange={props.handleInputChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label className="col-md-8">
                Address:
                <input
                  className="form-control"
                  type="text"
                  name="Address"
                  value={props.data.Address}
                  onChange={props.handleInputChange}
                />
              </label>
            </div>
            <div className="form-group" >
              <label className="col-md-8">
                Date range:<br />
                <DateRangePicker
                  //   className="form-control"
                  startDate={props.data.startDate} // momentPropTypes.momentObj or null,
                  startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                  endDate={props.data.endDate} // momentPropTypes.momentObj or null,
                  endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                  onDatesChange={({ startDate, endDate }) =>
                    props.setState({ startDate, endDate })
                  } // PropTypes.func.isRequired,
                  focusedInput={props.data.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                  onFocusChange={(focusedInput) => props.setState({ focusedInput })} // PropTypes.func.isRequired,
                />
                </label>
              </div>
                <div className={`form-group ${props.errorClass(props.data.formErrors.Price)}`}>
                  <label className="col-md-8">
                    Price:
                    <input
                      className="form-control"
                      type="text"
                      name="Price"
                      value={props.data.Price}
                      onChange={props.handleInputChange}
                    />
                  </label>
                </div>
                <input type="submit" value="Send" className="btn col-md-8 btn-primary text-center" disabled={!props.data.formValid} />
                    </form>
            </div>
        </div>

        </main>
        );
}

        export default NewAdComponent