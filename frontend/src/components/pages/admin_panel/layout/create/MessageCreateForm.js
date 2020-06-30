import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from "axios";
import {withRouter} from 'react-router-dom';

import header from "../../../../header";

class MessageCreateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content: "",
        }

        this.onChange.bind(this);
        this.onSubmit.bind(this);
    }

    onSubmit = e => {
        e.preventDefault();
        axios.post('/api_tct/important_message/', { "content": this.state.content,

        },
           header
        )
        .then(res => {
            alert("Message created.")
        })
        .catch(err => {
            console.log(err)
        });
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {

        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                  <h2 className="text-center text_jl">Create a message</h2>


                  <form onSubmit={e => this.onSubmit(e)}>
                    <div className="form-group">
                      <label className="text_jl">Message</label>
                      <textarea
                        rows="5"
                        type="text"
                        className="form-control"
                        name="content"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                    <div className="form-group">
                      <button className="button" type="submit">
                        <label className="text_jl_button">Create</label>
                      </button>
                    </div>

                  </form>
                </div>
          </div>
        )
    }
}

export default withRouter(MessageCreateForm)