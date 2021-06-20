import React, { Component } from 'react'
import moment from "moment";
import axios from "axios";
import AdComponent from './AdComponent';

export default class Ad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    changeStatus = (item) => {
        let statusID;
        if (item.statusID == 1)
            statusID = 2
        else if (item.statusID == 2)
            statusID = 1

        const path = `https://localhost:44307/api/Advertisement/changeStatus/${item.advertisementID}/${statusID}`;
        axios.put(path, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            console.log(response)
            this.props.load();
        }).catch((error) => {
            console.log(error)
        })
    }
    componentWillMount(){
      this.setState({data:this.props.dataParent})
    }
    load() {
        const path = `https://localhost:44307/api/Advertisement/getById/${this.state.data.advertisementID}`;
        axios.get(path).then((response) => {
            const data = response.data;
            this.setState({ data });
            console.log(this.state)
            console.log(response)
        });
    }

    render() {
      if(this.state.data){
      return(
        <AdComponent
            changeStatus={this.changeStatus}
            data={this.props.dataParent}
            key={this.props.key}
        />
    )
      }
      else return(<h1>loading</h1>);
    }
}
