import React, { Component } from "react";
import ReactDom from "react-dom";
import Login from "./layout/Login";
import Subscription from "./layout/Subscription";

class Authentication extends Component {
    render() {
        return (
        <div>
            <Login />
            <br />
            <Subscription />
        </div>
        )
    }
}

export default Authentication