import React, { Component } from "react";
import axios from 'axios';
import AdViewComponent from "./AdViewComponent"
export class AdView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Ad: null
    }
    this.workDone = this.workDone.bind(this);
  }
  componentWillMount(){
    const id = this.props.match.params.id;
    var path = `https://localhost:44307/api/Advertisement/getById/${id}`;
    axios.get(path).then(response => {
      const Ad = response.data;
      this.setState({ Ad });
    });
  }
  workDone = (item) => {
    let statusID = 4;
    const path = `https://localhost:44307/api/Advertisement/changeStatus/${item.advertisementID}/${statusID}`;
    axios.put(path, {
        headers: {
            "Content-Type": "application/json",
        },
    }).then(response => {
        console.log(response)
        window.location.reload();
    }).catch((error) => {
        console.log(error)
    })
}
  render() {
    if(this.state.Ad){
      return(<AdViewComponent Ad={this.state.Ad} user={this.props.user} workDone={this.workDone}></AdViewComponent>)
    }
    else return(<h1>Loading...</h1>)
  }
}