import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import FormField from "../Form";
import header from "../../../../header";

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
        axios.get('/api_tct/club/', header)
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
        axios.patch('/api_tct/club/' + this.state.club.id + '/', {'add_time_table' : this.state.time_table}, header )
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
                        <table style={{width: "80%"}}>
                            <tbody>
                                <tr>
                                    <th>
                                        <FormField type_input="text" model="time_table" id={time_table.id} field="time_table_str" label="time table" value={time_table.time_table_str} />
                                    </th>

                                    <th>
                                        <button type="button" onClick={() => this.handleRemove(time_table.id)}>Remove time table</button>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            })
            return list_timetable_component
        }
    }


    render() {
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center text_jl">Club information</h2>
                    <FormField type_input="text" model="club" id={this.state.club.id} field="name" label="Name" value={this.state.club.name} />
                    <FormField type_input="textarea" model="club" id={this.state.club.id} field="description" label="Description" value={this.state.club.description} />
                    <FormField type_input="text" model="club" id={this.state.club.id} field="street" label="Street" value={this.state.club.street} />
                    <FormField type_input="text" model="club" id={this.state.club.id} field="number" label="Number" value={this.state.club.number} />
                    <FormField type_input="text" model="club" id={this.state.club.id} field="zip_code" label="ZIP Code" value={this.state.club.zip_code} />
                    <FormField type_input="text" model="club" id={this.state.club.id} field="city" label="City" value={this.state.club.city} />
                    <FormField type_input="text" model="club" id={this.state.club.id} field="country" label="Country" value={this.state.club.country} />

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

                      <button onClick={(e) => this.addTimeTable(e)}>Add new time table</button>
                      <button onClick={(e) => this.updateTimeTable(e)}>Save all new time tables</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ClubUpdateForm