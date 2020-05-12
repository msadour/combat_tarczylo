import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from "axios";
import {withRouter} from 'react-router-dom';

class Subscription extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            author: "",
            category: "",
            url: "",
        }

        this.onChange.bind(this);
        this.onSubmit.bind(this);
    }

    onSubmit = e => {
        e.preventDefault();
        axios.post('/api_tct/book/', { "name": this.state.name,
                                        "author": this.state.author,
                                        "category": this.state.category,
                                        "url": this.state.url,

        })
        .then(res => {
            alert("Book advice created.")
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
                  <h2 className="text-center">Create a book</h2>


                  <form onSubmit={e => this.onSubmit(e)}>
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Author</label>
                      <input
                        type="text"
                        className="form-control"
                        name="author"
                        onChange={e => this.onChange(e)}
                      />
                    </div>


                    <div className="form-group">
                      <label>Category</label>
                      <input
                        type="text"
                        className="form-control"
                        name="category"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                    <div className="form-group">
                      <label>URL</label>
                      <input
                        type="text"
                        className="form-control"
                        name="url"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                    <div className="form-group">
                      <button type="submit" className="btn btn-primary">
                        Create
                      </button>
                    </div>

                  </form>
                </div>
          </div>
        )
    }
}

export default withRouter(Subscription)