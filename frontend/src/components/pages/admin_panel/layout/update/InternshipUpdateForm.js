import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import FormField from "../Form";

class InternshipUpdateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            internships: []
        }
    }

    componentDidMount(){
        axios.get('/api_tct/internship/')
        .then(res => {
            this.setState({internships: res.data});
        })
        .catch(err => {
            console.log(err)
        });
    }

    handleRemove(id) {
        event.preventDefault();
        axios.delete('/api_tct/internship/' + id + '/')
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        });
        return false
    }


    render() {
    
        var list_internship_component = []

        this.state.internships.forEach( internship => {

            list_internship_component.push(
                <div key={internship.id}>
                    <h2>{internship.name}</h2>
                    <FormField model="internship" id={internship.id} field="name" label="name" value={internship.name} />
                    <FormField model="internship" id={internship.id} field="description" label="description" value={internship.description} />
                    <FormField model="internship" id={internship.id} field="place" label="place" value={internship.place} />
                    <FormField model="internship" id={internship.id} field="level" label="level" value={internship.level} />
                    <FormField model="internship" id={internship.id} field="category" label="category" value={internship.category} />
                    <FormField model="internship" id={internship.id} field="date_begin" label="date_begin" value={internship.description} />
                    <FormField model="internship" id={internship.id} field="date_end" label="date_end" value={internship.place} />
                    <FormField model="internship" id={internship.id} field="price" label="price" value={internship.level} />
                    <FormField model="internship" id={internship.id} field="theme" label="theme" value={internship.category} />
                    <button type="button" onClick={() => this.handleRemove(internship.id)}>Remove</button> <br /><br />
                </div>
            )
        })

        return (
            <div>
                {list_internship_component}
            </div>
        )
    }
}

export default InternshipUpdateForm