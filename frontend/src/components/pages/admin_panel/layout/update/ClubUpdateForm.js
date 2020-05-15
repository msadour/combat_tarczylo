import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import FormField from "../Form";

class ClubUpdateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            club: {}
        }

        this.build_timetable.bind(this)
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

    handleRemove(id) {

        event.preventDefault();
        axios.delete('/api_tct/time_table/' + id + '/')
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        });
        return false
    }

    build_timetable(time_tables){
        if (typeof time_tables !== 'undefined'){
            var list_timetable_component = []
            time_tables.forEach( time_table => {
                list_timetable_component.push(
                    <div key={time_table.id}>
                        <FormField model="time_table" id={time_table.id} field="time_table_str" label="time table" value={time_table.time_table_str} />
                        <button type="button" onClick={() => this.handleRemove(time_table.id)}>Remove time table</button>
                    </div>
                )
            })
            console.log(list_timetable_component);
            return list_timetable_component
        }
    }


    render() {
        return (
            <div>
                <h2>{this.state.club.name}</h2>
                <FormField model="club" id={this.state.club.id} field="name" label="name" value={this.state.club.name} />
                <FormField model="club" id={this.state.club.id} field="description" label="description" value={this.state.club.description} />
                <FormField model="club" id={this.state.club.id} field="street" label="street" value={this.state.club.street} />
                <FormField model="club" id={this.state.club.id} field="number" label="number" value={this.state.club.number} />
                <FormField model="club" id={this.state.club.id} field="zip_code" label="zip_code" value={this.state.club.zip_code} />
                <FormField model="club" id={this.state.club.id} field="city" label="city" value={this.state.club.city} />
                <FormField model="club" id={this.state.club.id} field="country" label="country" value={this.state.club.country} />
                {this.build_timetable(this.state.club.time_table)}

            </div>
        )
    }
}

export default ClubUpdateForm