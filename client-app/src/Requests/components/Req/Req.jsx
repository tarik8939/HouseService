import React, { Component } from 'react';
import axios from "axios";
import  ReqComponent  from './ReqComponent';
export default class Req extends Component {
  constructor(props) {
    super(props);
    this.state = {
      req: this.props.req
    };
    this.edit = this.edit.bind(this);
  }

  componentDidMount() {
    const path = `https://localhost:44307/api/Request/getById/${this.state.req.requestID}`;
    axios.get(path).then((response) => {
      const req = response.data;
      this.setState({ req });
      console.log(this.state.req);
    });
  }
  edit(comment) {
    const path = `https://localhost:44307/api/Request/edit/${this.state.req.requestID}`;
    axios.put(path, {
      comment: comment
    }).then((response) => {
      const req = response.data;
      if (req) {
        alert("success");
        this.setState({ req });
        console.log(this.state.req);
      }
    });
  }
  render() {
    return (
      <div>
        <ReqComponent key={this.props.key}
        req={this.state.req}
        changeState={this.props.changeState}
        edit={this.edit}
        />
      </div>
    );
  }
}