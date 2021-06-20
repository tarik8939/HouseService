import React, { Component } from 'react';
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { Prompt } from 'react-st-modal';
export default class Req extends Component {
  constructor(props) {
    super(props);
    this.state = {
      req: this.props.req,
      loaded: false
    }
  }

  componentDidMount() {
    const path = `https://localhost:44307/api/Request/getById/${this.state.req.requestID}`;
    axios.get(path).then((response) => {
      const req = response.data;
      const loaded = true;
      this.setState({ req, loaded });
      console.log(this.state.req);
    });
  }
  changeState(id) {
    alert("Are you sure you want to delete this request?");
    const path = `https://localhost:44307/api/Request/delete/${id}`;
    axios.delete(path).then(response => {
      console.log(response);
      window.location.reload();
    })

  }
  edit(comment){
    const path = `https://localhost:44307/api/Request/edit/${this.state.req.requestID}`;
    axios.put(path,{
      comment: comment}).then((response) => {
      const req = response.data;
      if(req){
      alert("success");
      this.setState({ req });
      console.log(this.state.req);}
    });
  }
  render() {
    return (<div className="row" key={this.props.key}>
      <div className="border border-primary rounded m-1 ml-4">
        <div className="row col-md-12">
          <div className="row">
            <span className="col-md-4">
              Advertisement: <Link to={`/AdView/${this.state.req.advertisement.advertisementID}`}>
                {this.state.req.advertisement.name}
              </Link>
            </span>
          </div>

          <div className="row">
            <span className="col-md-3">
              Status: {this.state.req.state.stateName}
            </span>
          </div>
          <div className="row">
            <span className="col-2 mb-2 ">From: {moment(this.state.req.advertisement.startDate).format('L')}</span>
            <span className="col-2 ml-3 mb-2 ">Until: {moment(this.state.req.advertisement.endDate).format('L')}</span>
            <span className="col-2 ml-3 mb-2 ">Price: {this.state.req.advertisement.price} $</span>
          </div>

        </div>
        <div className="row col-md-12 m-1">
          <button type="button" className="btn btn-outline-danger col-md-2" onClick={(e) => this.changeState(this.state.req.requestID, e)}>Delete</button>
          <button type="button" className="btn btn-outline-warning col-md-2" onClick={async () => {
            const result = await Prompt('Change your message', { defaultValue: this.state.req.comment });

            if (result) {
              this.edit(result);
            } else {
            }
          }}>Edit</button>
        </div>
      </div>

    </div>);
  }
}