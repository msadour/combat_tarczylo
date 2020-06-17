import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import FormField from "../Form";
import header from "../../../../header";

class InternshipUpdateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            internships: [],
            time_table: [],
        }

        this.build_timetable.bind(this);
        this.addTimeTable.bind(this);
    }

    componentDidMount(){
        axios.get('/api_tct/internship/', header)
        .then(res => {
            this.setState({internships: res.data});
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

    updateTimeTable(id){
        axios.patch('/api_tct/internship/' + id + '/', {'add_time_table' : this.state.time_table}, header )
        .then(res => {
            alert("Time table updated.");
            window.location.reload();
        })
        .catch(err => {
            console.log(err)
        });
    }


    handleChange(e, index) {
        this.state.time_table[index] = e.target.value;
        this.setState({time_table: this.state.time_table})
    }

    handleRemoveTimeTable(index) {
        this.state.time_table.splice(index, 1)
        this.setState({time_table: this.state.time_table})
        return false
    }

    handleRemove(id, model) {
        event.preventDefault();

        if (model == 'time_table') {
            var url = '/api_tct/time_table/'
        } else{
            var url = '/api_tct/internship/'
        }

        axios.delete(url + id + '/')
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        });
        return false
    }

    build_timetable(internship){
        var list_timetable_component = []

        var time_tables = internship.time_table
        time_tables.forEach( time_table => {
            list_timetable_component.push(
                <div key={time_table.id}>
                    <h2>{time_table.name}</h2>
                    <FormField type_input="text" model="time_table" id={time_table.id} field="time_table_str" label="time table" value={time_table.time_table_str} />
                    <button type="button" onClick={() => this.handleRemove(time_table.id, 'time_table')}>Remove time table</button>
                </div>
            )
        })
        return list_timetable_component
    }


    render() {
    
        var list_internship_component = []

        this.state.internships.forEach( internship => {

            list_internship_component.push(
                <div key={internship.id}>
                    <h2>{internship.name}</h2>
                    <FormField type_input="text" model="internship" id={internship.id} field="name" label="Name" value={internship.name} />
                    <FormField type_input="text" model="internship" id={internship.id} field="description" label="Description" value={internship.description} />
                    <FormField type_input="text" model="internship" id={internship.id} field="place" label="Place" value={internship.place} />
                    <FormField type_input="text" model="internship" id={internship.id} field="level" label="Level" value={internship.level} />
                    <FormField type_input="text" model="internship" id={internship.id} field="category" label="Category" value={internship.category} />
                    <FormField type_input="date" model="internship" id={internship.id} field="date_begin" label="Date begin" value={internship.date_begin_formated} />
                    <FormField type_input="date" model="internship" id={internship.id} field="date_end" label="Date end" value={internship.date_end_formated} />
                    <FormField type_input="price" model="internship" id={internship.id} field="price" label="Price" value={internship.price} />
                    <FormField type_input="text" model="internship" id={internship.id} field="theme" label="Theme" value={internship.theme} />
                    <FormField type_input="choice" model_value_possible="instructor" model="internship" id={internship.id} field="instructor" label="Instructor" value={internship.instructor} />

                    {this.build_timetable(internship)}
                    <button type="button" onClick={() => this.handleRemove(internship.id, 'internship')}>Remove</button> <br /><br />
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
                                  <button type="button" onClick={() => this.updateTimeTable(internship.id)}>Update news time table</button>)
                            </div>
                        )
                    })
                  }

                  <button onClick={(e) => this.addTimeTable(e)}>Add time table</button>
                </div>
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