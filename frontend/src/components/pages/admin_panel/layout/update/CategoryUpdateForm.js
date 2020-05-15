import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import FormField from "../Form";

class CategoryUpdateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: []
        }
    }

    componentDidMount(){
        axios.get('/api_tct/category/')
        .then(res => {
            this.setState({categories: res.data});
        })
        .catch(err => {
            console.log(err)
        });
    }

    handleRemove(id) {
        event.preventDefault();
        axios.delete('/api_tct/category/' + id + '/')
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        });
        return false
    }


    render() {
        var list_category_component = []

        this.state.categories.forEach( category => {

            list_category_component.push(
                <div key={category.id}>
                    <h2>{category.name}</h2>
                    <FormField model="category" id={category.id} field="name" label="name" value={category.name} />
                    <button type="button" onClick={() => this.handleRemove(category.id)}>Remove</button>
                </div>

            )

        })

        return (
            <div>
                {list_category_component}

            </div>
        )
    }
}

export default CategoryUpdateForm