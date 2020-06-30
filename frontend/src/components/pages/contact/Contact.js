import React, { Component } from "react";
import ReactDom from "react-dom";

class Contact extends Component {
    render() {

        return (
            <div className="col-md-6 m-auto">
            <div className="card card-body mt-5">
              <h2 className="text-center text_jl">Do you want get in touch or have a question?</h2>
              <form >
                <div className="form-group">
                  <label className="text_jl">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                  />
                </div>

                <div className="form-group">
                  <label className="text_jl">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                  />
                </div>

                <div className="form-group">
                  <label className="text_jl">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                  />
                </div>

                <div className="form-group">
                  <label className="text_jl">Message</label>
                  <textarea
                    type="text"
                    className="form-control"
                    name="subject"
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="button">
                    <label className="text_jl_button">Send</label>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
    }
}

export default Contact