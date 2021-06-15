import logo from './logo.svg';
import './App.css';
import { Container } from 'reactstrap';
import React, { Component } from "react";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Nav } from "./components/Nav";
import { Home } from "./components/Home"
import { NewAd } from "./Advertisement/NewAd"
import { BrowserRouter, Route } from "react-router-dom"
import { Layout } from './components/Layout';
import { Logout} from './components/Logout';
import { ListOfAds} from './Advertisement/ListOfAds';


export class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedInStatus : "NOT_LOGGED_IN",
      user : {}
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  async checkLoginStatus() {
    const path = 'https://localhost:44307/api/Auth/user';
    await fetch(path,  {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(response => response.json())
    .then(response => {
      if(response.userID > 0 && this.state.loggedInStatus === "NOT_LOGGED_IN"){
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: response
        });
      } else if (
        !response.userID &&
        (this.state.loggedInStatus === "LOGGED_IN")
      ) {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {}
        });
      }
    })
    .catch(error => {
      console.log("check login error", error);
    });
        
  }
  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    });
  }
  handleLogin(data){
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user:data
    })
  }
  render(){
    return (
      <BrowserRouter>
      <Layout loggedInStatus={this.state.loggedInStatus} user={this.state.user}>
            <Route path={"/"} exact render={(props)=>(<ListOfAds{...props} loggedInStatus={this.state.loggedInStatus} user={this.state.user}/>)}/>
            <Route path="/login" exact render={(props)=>(<Login{...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus}/>)}/>
            <Route path="/logout" exact render={(props)=>(<Logout{...props} handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus}/>)}/>
            <Route path="/register" render={(props)=>(<Register{...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus}/>)}/>
            <Route exact path="/newAd" render={(props)=>(<NewAd{...props} loggedInStatus={this.state.loggedInStatus}/>)}/>
      </Layout>
      </BrowserRouter>
            
    );
  }
}

export default App;
