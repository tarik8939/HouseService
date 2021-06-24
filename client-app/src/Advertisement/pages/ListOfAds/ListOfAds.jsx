import React, { Component } from "react";
import axios from "axios";
import ListOfAdsComponent from "./ListOfAdsComponent";

export class ListOfAds extends Component {
    static displayName = ListOfAds.Name;
    constructor(props) {
        super(props);
        this.state = {
            Ads: [],
            title: "",
            isLoading: false,
        }
        this.onSort = this.onSort.bind(this);
        this.HandleValueChange = this.HandleValueChange.bind(this);
        this.load = this.load.bind(this);
    }


    componentDidMount() {
      this.load();
    }
    load(){
      if (this.props.loggedInStatus === "LOGGED_IN" && this.props.myAds) {
        const path = `https://localhost:44307/api/Advertisement/getByUserId/${this.props.user.userID}`;
        axios.get(path).then((response) => {
            const Ads = response.data;
            const isLoading = true;
            this.setState({ Ads, isLoading });
            console.log(this.state)
            console.log(response)
        });
      }
    else{
      const path = `https://localhost:44307/api/Advertisement/getAll`;
      axios.get(path).then((response) => {
          const Ads = response.data.filter(x => x.statusID == 1);
          const isLoading = true;
          this.setState({ Ads, isLoading });
          console.log(this.state)
          console.log(response)
      });
      }
      
    }
    HandleValueChange(event) {
        event.preventDefault();
        let value = event.target.value;
        this.state.title = value;
        this.setState({
            [event.target.name]: event.target.value,
        });
        this.load();
    }
    onSort(event) {
        event.preventDefault();
        let value = event.target.value;
        let items;
        switch (value) {
            case "Name":
                items = this.state.Ads.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
                this.setState({
                    [this.state.Ads]: items
                })
                break;
            case "Price":
                items = this.state.Ads.sort((a, b) => (a.price > b.price) ? 1 : -1)
                this.setState({
                    [this.state.Ads]: items
                })
                break;
            case "Date":
                items = this.state.Ads.sort((a, b) => (a.startDate > b.startDate) ? 1 : -1)
                this.setState({
                    [this.state.Ads]: items
                })
                break;
        }
    }


    render() {
        return(
          <ListOfAdsComponent onSort={this.onSort} HandleValueChange={this.HandleValueChange} state={this.state} load = {this.load}></ListOfAdsComponent>
        );

    }
}