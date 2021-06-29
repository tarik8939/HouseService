import React, { Component } from 'react'
import axios from "axios";

export default class NewRequest extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userID: null,
      advertisementID: null,
      comment: "",
      request: null
    };
    this.Submit = this.Submit.bind(this);
  }
  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }
  componentDidMount() {
    const userID = this.props.userID;
    const advertisementID = this.props.advertisementID;
    this.setState({ userID, advertisementID });
    const path = `https://localhost:44307/api/Request/getForUser/${this.props.userID}&${this.props.advertisementID}`;
    axios.get(path).then(response => {
      if (response.data != "") {
        const request = response.data;
        this.setState({ request })
      }
      console.log(this.state.request)
    });
  }
  Submit(event) {
    event.preventDefault();
    const path = "https://localhost:44307/api/Request/create";
    axios.post(path, {
      userID: this.state.userID,
      advertisementID: this.state.advertisementID,
      comment: this.state.comment
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });

  }

  render() {
    if (this.state.request != null) {
      return (
        <div>
          <p className="fs-5">Your request status: {this.state.request.state.stateName}</p>
          <p className="fs-5">Your comment: {this.state.request.comment}</p>
        </div>

      );
    }
    else {
      return (
        <div className="row">
          <form onSubmit={this.Submit}>
            <h2 className="text-center">Send request</h2>
            {/* <label className="col-md-8 mr-4">
              Message for house owner:
            </label> */}
            <p>Message for house owner:</p>
            <input
              type="text"
              required className="form-control mb-3"
              name="comment"
              value={this.state.comment}
              onChange={this.handleInputChange}
            />
            <input type="submit" value="Send" className="btn col-md-12 btn-primary text-center" />
          </form>
        </div>

      );
    }
  }
}
