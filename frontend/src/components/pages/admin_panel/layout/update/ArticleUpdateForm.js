import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import FormField from "../Form";

class ArticleUpdateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            articles: []
        }
    }

    componentDidMount(){
        axios.get('/api_tct/article/')
        .then(res => {
            this.setState({articles: res.data});
        })
        .catch(err => {
            console.log(err)
        });
    }

    handleRemove(id) {
        event.preventDefault();
        axios.delete('/api_tct/article/' + id + '/')
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
                    <FormField model="article" id={article.id} field="title" label="title" value={article.title} />
                    <FormField model="article" id={article.id} field="content" label="content" value={article.content} />
                    <FormField model="article" id={article.id} field="category" label="category" value={article.category} />
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