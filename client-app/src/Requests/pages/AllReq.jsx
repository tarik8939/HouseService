import React, { Component } from 'react'
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { Prompt } from 'react-st-modal';
import Req from "../components/Req/Req";
export class AllReq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Reqs: [],
    }
    this.load = this.load.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  componentDidMount() {
    this.load();
  }
  load() {
    const userID = this.props.user.userID;
    const path = `https://localhost:44307/api/Request/getByUserId/${userID}`;
    axios.get(path).then((response) => {
      const Reqs = response.data
      this.setState({ Reqs });
      console.log(this.state.Reqs)
    });
  }
  changeState(id) {
    alert("Are you sure you want to delete this request?");
    const path = `https://localhost:44307/api/Request/delete/${id}`;

    axios.delete(path).then(response => {
      console.log(response)
      let Reqs = this.state.Reqs.filter(x => x.requestID != id)
      this.setState({ Reqs });
      this.load();
    })
  }


  render() {
    if (this.state.Reqs)
      return (
        <div>
          <div className="text-center row mb-2">
            <h1>My requests</h1>
          </div>
          <div>
            {this.state.Reqs.map((item) => (
              <Req key={item.requestID} req={item} load={this.load} changeState={this.changeState} />
            ))}
          </div>
        </div>
      )
    else {
      return (<h1>loading</h1>)
    }
  }
}
