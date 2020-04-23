import React, { Component } from "react";
import ReactDom from "react-dom";

class Contact extends Component {
    render() {

        return (
            <div className="col-md-6 m-auto">
            <div className="card card-body mt-5">
              <h2 className="text-center">Do you want get in touch or have a question?</h2>
              <form >
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                  />
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                  />
                </div>

                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    type="text"
                    className="form-control"
                    name="subject"
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
    }
}

export default Contact