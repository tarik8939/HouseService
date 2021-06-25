import React, { Component } from "react";
import axios from 'axios';
import AdViewComponent from "./AdViewComponent"
export class AdView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Ad: null,
      rating: null
    }
    this.workDone = this.workDone.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (rating) => {
    this.setState({ rating: rating });
  }
  componentWillMount() {
    const id = this.props.match.params.id;
    var path = `https://localhost:44307/api/Advertisement/getById/${id}`;
    axios.get(path).then(response => {
      const Ad = response.data;
      this.setState({ Ad });
    });
  }
  workDone = (item) => {
    if (this.state.rating === null) {
      alert("please rate your contractor from 1-5");
      window.location.reload();
    }
    const path = `https://localhost:44307/api/Advertisement/changeRating/${item.advertisementID}/${this.state.rating}`;
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
    if (this.state.Ad) {
      return (<AdViewComponent user={this.props.user} workDone={this.workDone} state={this.state} handleChange={this.handleChange}></AdViewComponent>)
    }
    else return (<h1>Loading...</h1>)
  }
}