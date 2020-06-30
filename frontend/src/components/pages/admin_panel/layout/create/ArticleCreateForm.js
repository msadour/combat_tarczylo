import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from "axios";
import {withRouter} from 'react-router-dom';

import header from "../../../../header";

class ArticleCreateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            content: "",
            category: "",
        }

        this.onChange.bind(this);
        this.onSubmit.bind(this);
    }


    onSubmit = e => {
        e.preventDefault();

        axios.post('/api_tct/article/', { "title": this.state.title,
                                        "content": this.state.content,
                                        "category": this.state.category,
        },
           header
        )
        .then(res => {
            alert("Article created.");
            window.location.reload();
        })
        .catch(err => {
            console.log(err)
        });
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {

        const{username, email, password, password_again} = this.state

        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                  <h2 className="text-center text_jl">Create Article</h2>


                  <form onSubmit={e => this.onSubmit(e)}>
                    <div className="form-group">
                      <label className="text_jl">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="text_jl">Content</label>
                      <textarea
                        rows="5"
                        type="text"
                        className="form-control"
                        name="content"
                        onChange={e => this.onChange(e)}
                      />
                    </div>


                    <div className="form-group">
                      <label className="text_jl">Category</label>
                      <input
                        type="text"
                        className="form-control"
                        name="category"
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

export default withRouter(ArticleCreateForm)