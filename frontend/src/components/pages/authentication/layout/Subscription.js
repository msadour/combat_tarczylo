import React, { Component } from "react";
import ReactDom from "react-dom";

class Subscription extends Component {

    state = {
        username: "",
        email: "",
        password: "",
        password_again: "",
    }

    onSubmit = e => {
        e.preventDefault();
        console.log('submit')
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {

        const{username, email, password, password_again} = this.state

        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                  <h2 className="text-center">Do you want join us?</h2>
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
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
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
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password2"
                      />
                    </div>

                    <div className="form-group">
                      <button type="submit" className="btn btn-primary">
                        Register
                      </button>
                    </div>

                  </form>
                </div>
          </div>
        )
    }
}

export default Subscription