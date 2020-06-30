import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from "axios";
import {withRouter} from 'react-router-dom';

import header from "../../../../header";

class CategoryCreateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
        }

        this.onChange.bind(this);
        this.onSubmit.bind(this);
    }

    onSubmit = e => {
        e.preventDefault();
        axios.post('/api_tct/category/', { "name": this.state.name,

        },
           header
        )
        .then(res => {
            alert("Your category is created.")
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
                  <h2 className="text-center text_jl">Create category for products</h2>


                  <form onSubmit={e => this.onSubmit(e)}>
                    <div className="form-group">
                      <label className="text_jl">Category</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                    <div className="form-group">
                      <button type="submit" className="button">
                        <label className="text_jl_button">Create</label>
                      </button>
                    </div>

                  </form>
                </div>
          </div>
        )
    }
}

export default withRouter(CategoryCreateForm)