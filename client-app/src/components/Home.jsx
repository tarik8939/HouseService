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
      <div >
        <h2>HouseService this is a place where everyone can place ads for home care or find a well-paid job</h2>
        <p className="lead">Types of work posted on the site:</p>
        <ul>
          <li className="lead">Repairs</li>
          <li className="lead">Work with plumbing</li>
          <li className="lead">Construction works</li>
          <li className="lead">High-altitude works</li>
          <li className="lead">Yard care work</li>
        </ul>

      </div>
    );
  }
}

export default Home;