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
        <h2>House Service is a place for upgrading your house or finding a well-paid job</h2>
        <p className="lead">Types of work that available on our site:</p>
        <ul>
          <li className="lead">Repairs</li>
          <li className="lead">Plumbing</li>
          <li className="lead">Renovation</li>
          <li className="lead">Construction works</li>
          <li className="lead">Yard care works</li>
        </ul>

      </div>
    );
  }
}

export default Home;