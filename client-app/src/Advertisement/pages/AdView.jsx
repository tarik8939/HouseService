import React, { Component } from "react";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import { Redirect } from 'react-router-dom';
import ReqForAd  from "../../Requests/components/ReqForAd";
import NewRequest from "../../Requests/components/NewRequest";
export class AdView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Ad: null,
            loaded: false,
            redirect: false,
        }
    }
    load(){
      const id = this.props.match.params.id;
        var path = `https://localhost:44307/api/Advertisement/getById/${id}`;
        axios.get(path).then(response => {
            const Ad = response.data;
            const loaded = true
            this.setState({ Ad, loaded })
            console.log(this.state.Ad)
            console.log(this.state.loaded)
        });
    }
    render() {        if (this.state.redirect) {
            return (<Redirect to={`/editAd/${this.state.Ad.advertisementID}`} />);
        }
        if (this.state.loaded == false) {
            this.load();
            return (
              <p>Loading...</p>
            )
        }
        else {
          const ForHouseOwner = () => {
            if (this.state.Ad.userID === this.props.user.userID) {
                return (
                    <div>
                        <input type="button" value="Edit" onClick={(e) => this.Edit(e)}
                            className="btn col-md-12 btn-primary text-center" />
                            <div className="row justify-content-center mt-4">
                            {this.state.Ad.requests.filter(x => x.stateID == 1 || x.stateID == 3).map((item, index) => (
                                <ReqForAd key={index} dataParent={item} />
                            ))}
                        </div>
                    </div>
                    

                )
            }
        }
        const ForContractor = () => {
          if (this.props.user.userTypeID === 2) {
              return (
                 <NewRequest userID={this.props.user.userID} advertisementID = {this.state.Ad.advertisementID} />
              )
          }
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-2">
                        {/* <span>Picture place</span> */}
                    </div>
                    <div className="col-lg-8">
                        <div>
                            <h2>{this.state.Ad.name}</h2>
                            <hr style={{ border: 'none', height: '3px', backgroundColor: 'grey' }}></hr>
                            <span>{this.state.Ad.description}</span>
                        </div>
                        <div className="row justify-content-start mt-4">
                            <span className="col-4 text-primary">Owner: {this.state.Ad.user.fullName}</span>
                            <span className="col-1"></span>

                        </div>
                        <div className="row justify-content-start mt-4">
                            <span className="col-4">Address: {this.state.Ad.address}</span>
                        </div>
                        <div className="row justify-content-start mt-4">
                            <span className="col-md-4">Accomplish From:{moment(this.state.Ad.startDate).format('L')}  </span>
                            <span className="col-md-2">Until:{moment(this.state.Ad.endDate).format('L')}</span>
                            <span className="col-md-4"></span>
                            <span className=" col-md-2 text-success">{this.state.Ad.price}$</span>
                        </div>
                        <div className="row justify-content-center mt-4">
                            {ForHouseOwner()}
                            {ForContractor()}
                        </div>
                    </div>
                </div>
            </div>
        )
        }

    }
    Edit(event) {
        event.preventDefault();
        this.setState({ redirect: true });
        this.render();
    }
}