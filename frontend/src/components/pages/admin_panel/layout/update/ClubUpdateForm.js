import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import FormField from "../Form";

class CategoryUpdateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            club: {}
        }
    }

    componentDidMount(){
        axios.get('/api_tct/club/')
        .then(res => {
            this.setState({club: res.data});
        })
        .catch(err => {
            console.log(err)
        });
    }


    render() {

        return (
            <div>
                <h2>{this.state.club.name}</h2>
                <FormField model="club" id={this.state.club.id}  field="name" label="name" value={this.state.club.name} />
                <FormField model="club" id={this.state.club.id}  field="description" label="description" value={this.state.club.description} />
                <FormField model="club" id={this.state.club.id}  field="street" label="street" value={this.state.club.street} />
                <FormField model="club" id={this.state.club.id}  field="number" label="number" value={this.state.club.number} />
                <FormField model="club" id={this.state.club.id}  field="zip_code" label="zip_code" value={this.state.club.zip_code} />
                <FormField model="club" id={this.state.club.id}  field="city" label="city" value={this.state.club.city} />
                <FormField model="club" id={this.state.club.id}  field="country" label="country" value={this.state.club.country} />
            </div>
        )
    }
}

export default CategoryUpdateForm