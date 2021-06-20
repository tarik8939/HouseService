import React, { Component } from 'react'
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { Prompt } from 'react-st-modal';
import Req from "../components/Req";
export class AllReq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Reqs: [],
    }
  }

  componentDidMount() {
    const userID = this.props.user.userID;
    const path = `https://localhost:44307/api/Request/getByUserId/${userID}`;
    axios.get(path).then((response) => {
      const Reqs = response.data
      this.setState({ Reqs });
      console.log(this.state.Reqs)
    });
  }
  changeState(id) {
    alert(id)
    const path = `https://localhost:44307/api/Request/delete/${id}`;

    axios.delete(path).then(response => {
      console.log(response)
      let Reqs = this.state.Reqs.filter(x => x.requestID != id)
      this.setState({ Reqs });
    })

  }

  render() {
    return (
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <h1 className="text-center">My requests</h1>
          {this.state.Reqs.map((item, index) => (
             <Req key={index} req={item} />
          ))}

        </div>
      </div>
    )
  }
}
