import logo from './logo.svg';
import './App.css';
import {Login} from "./components/Login";
import {Register} from "./components/Register";
import {Nav} from "./components/Nav";
import {Home} from "./components/Home"
import {BrowserRouter, Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav/>
        <main className="text-center">
            <Route path="/" exact component={Home}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
        </main>
        </BrowserRouter>
    </div>
  );
}

export default App;
