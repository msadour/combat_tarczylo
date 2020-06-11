import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';
import {withRouter} from 'react-router-dom';

import { login } from '../actions/auth';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",

        }
        this.onChange.bind(this);
        this.onSubmit.bind(this);
    }

    onSubmit = e => {
        e.preventDefault();
        fetch('/api_tct/api-token-auth/', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({"username": this.state.username, "password": this.state.password})
        })
        .then(response => response.json())
        .then((data) => {
            localStorage.setItem('token', data["token"]);
            localStorage.setItem('member_id', data["member_id"]);
            localStorage.setItem('is_admin', data["is_admin"]);
            localStorage.setItem('username', this.state.username);
            this.props.history.push("/")
            window.location.reload();
        })
        .catch(err => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('member_id');
            this.props.history.push("/authentication");
        });
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {

        const{ username, password} = this.state

        return (
          <div className="col-md-6 m-auto">
            <div className="card card-body mt-5">
              <h2 className="text-center">Do you have an account</h2>
              <form onSubmit={e => this.onSubmit(e)}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    onChange={e => this.onChange(e)}
                    value={this.state.username}
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={e => this.onChange(e)}
                    value={this.state.password}
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
    }
}

export default withRouter(Login)