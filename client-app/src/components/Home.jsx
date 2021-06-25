import React, { Component } from 'react';
import axios from 'axios';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
  }

  render() {
    return (
      <div className="row container">
        <div className="col-2"></div>
        <div className="col-7">
        <h2 className="text-center">House Service is a place for upgrading your house or finding a well-paid job</h2>
        <p className="fs-4 text-center">Types of work that available on our site:</p>
        <ul className="">
          <li className="lead">Repairs</li>
          <li className="lead">Plumbing</li>
          <li className="lead">Renovation</li>
          <li className="lead">Construction works</li>
          <li className="lead">Yard care works</li>
        </ul>
        </div>
        <div className="col-3"></div>
      </div>
    );
  }
}

export default Home;