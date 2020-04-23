import React, { Component } from "react";
import ReactDom from "react-dom";

class Login extends Component {
    render() {

        return (
          <div className="col-md-6 m-auto">
            <div className="card card-body mt-5">
              <h2 className="text-center">Do you have an account</h2>
              <form >
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
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

export default Login