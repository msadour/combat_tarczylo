import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import FormField from "../Form";
import header from "../../../../header";

class ArticleUpdateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            articles: []
        }
    }

    componentDidMount(){
        fetch('/api_tct/article/', {
            method: "GET",
            headers: { 'Authorization': 'Token ' + localStorage.getItem('token') },
        })
        .then(response => response.json())
        .then((data) => {
            this.setState({articles: data});
        })
        .catch(err => {
            console.log(err);
        });
    }

    handleRemove(id) {
        event.preventDefault();
        fetch('/api_tct/article/' + id + '/', {
            method: "DELETE",
            headers: { 'Authorization': 'Token ' + localStorage.getItem('token') },
        })
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        });
        return false
    }


    render() {
        var list_article_component = []

        this.state.articles.forEach( article => {
            list_article_component.push(
                <div key={article.id}>
                    <h2>{article.title}</h2>
                    <FormField type_input="text" model="article" id={article.id} field="title" label="Title" value={article.title} />
                    <FormField type_input="text" model="article" id={article.id} field="content" label="Content" value={article.content} />
                    <FormField type_input="text" model="article" id={article.id} field="category" label="Category" value={article.category} />
                    <button type="button" onClick={() => this.handleRemove(article.id)}>Remove</button> <br /><br />
                </div>
            )
        })

        return (
            <div>
                {list_article_component}

            </div>
        )
    }
}

export default ArticleUpdateForm