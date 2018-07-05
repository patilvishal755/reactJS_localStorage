import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { LoginForm } from "./Pages/Login/Login.js";
import Logged from "./Pages/Login/Logged.js";
import {WrappedRegistrationForm} from "./Pages/Login/register.js";
import "antd/dist/antd.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={LoginForm} />
          <Route path="/loggedIn" component={Logged} />
          <Route path="/register" component={WrappedRegistrationForm}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
