import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import FormField from "../Form";

class ClubUpdateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            club: {},
            time_table: [],
        }

        this.build_timetable.bind(this);
        this.addTimeTable.bind(this);
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

    addTimeTable() {
        event.preventDefault();
        this.setState({time_table: [...this.state.time_table, ""]});
        return false
    }

    updateTimeTable(){
        axios.patch('/api_tct/club/' + this.state.club.id + '/', {'add_time_table' : this.state.time_table} )
        .then(res => {
            alert("Tine table updated.");
            window.location.reload();
        })
        .catch(err => {
            console.log(err)
        });
    }

    handleRemoveTimeTable(index) {
        this.state.time_table.splice(index, 1)
        this.setState({time_table: this.state.time_table})
        return false
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleChange(e, index) {
        this.state.time_table[index] = e.target.value;
        this.setState({time_table: this.state.time_table})
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

                <div className="form-group">
                  {
                    this.state.time_table.map((timetable, index) =>{
                        return (
                            <div key={index}>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="time_table"
                                    placeholder="Monday 10:00:00 12:30:00"
                                    value={timetable}
                                    onChange={e => this.handleChange(e, index)}
                                  />
                                  <button type="button" onClick={() => this.handleRemoveTimeTable(index)}>Remove</button>
                                  <button type="button" onClick={() => this.updateTimeTable()}>Update news time table</button>)



                            </div>
                        )
                    })
                  }

                  <button onClick={(e) => this.addTimeTable(e)}>Add time table</button>
                  <button onClick={(e) => this.updateTimeTable(e)}>Update time table</button>
                </div>
            </div>
        )
    }
}

export default ClubUpdateForm