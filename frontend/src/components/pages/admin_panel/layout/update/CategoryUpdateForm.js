import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import FormField from "../Form";
import header from "../../../../header";

class CategoryUpdateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: []
        }
    }

    componentDidMount(){
        axios.get('/api_tct/category/', header)
        .then(res => {
            this.setState({categories: res.data});
        })
        .catch(err => {
            console.log(err)
        });
    }

    handleRemove(id) {
        event.preventDefault();
        axios.delete('/api_tct/category/' + id + '/', header)
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
                <div key={category.id} className="col-md-6 m-auto">
                    <div className="card card-body mt-5">
                        <h2 className="text-center">{category.name}</h2>
                        <FormField type_input="text" model="category" id={category.id} field="name" label="Name" value={category.name} />
                        <button style={{width:"10%"}} type="button" onClick={() => this.handleRemove(category.id)}>Remove</button>
                    </div>
                </div>

            )

        })

        return (
            <div>
                {list_category_component}
                <br /><br />
            </div>
        )
    }
}

export default CategoryUpdateForm