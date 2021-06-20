import React, { Component } from "react";
import axios from 'axios';
import AdViewComponent from "./AdViewComponent"
export class AdView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Ad: null
    }
  }
  componentWillMount(){
    const id = this.props.match.params.id;
    var path = `https://localhost:44307/api/Advertisement/getById/${id}`;
    axios.get(path).then(response => {
      const Ad = response.data;
      this.setState({ Ad });
    });
  }
  render() {
    if(this.state.Ad){
      return(<AdViewComponent Ad={this.state.Ad} user={this.props.user}></AdViewComponent>)
    }
    else return(<h1>Loading...</h1>)
  }
}