import React, { Component } from 'react'
import axios from "axios";

export default class NewRequest extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userID : null,
      advertisementID: null,
      comment : "",
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
    this.setState({userID, advertisementID});
    const path = `https://localhost:44307/api/Request/getForUser/${this.props.userID}&${this.props.advertisementID}`;
    axios.get(path).then(response => {
      if(response.data!=""){
      const request = response.data;
      this.setState({ request})}
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
    if(this.state.request!=null){
      return (
        <div>
            <h3>Your request status: {this.state.request.state.stateName}</h3>
        </div>
  
      );
    }
    else{
    return (
      <div>
        <form onSubmit={this.Submit}>
          <h2>Send request</h2>
          <label className="col-md-8">
            Message for house owner:
            <input
              type="text"
              required className="form-control"
              name="comment"
              value={this.state.comment}
              onChange={this.handleInputChange}
            />
          </label>
          <input type="submit" value="Send" className="btn col-md-8 btn-primary text-center" />
        </form>
      </div>

    );
    }
  }
}
