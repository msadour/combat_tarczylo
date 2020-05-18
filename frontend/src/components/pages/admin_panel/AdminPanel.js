import React, { Component, Fragment } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"

import MenuManager from "./manager/MenuManager"

class AdminPanel extends Component {

  constructor(props) {
    super(props);
  }

    render() {
        return (
            <div>
                <MenuManager />

            </div>
        )
    }
}

export default AdminPanel