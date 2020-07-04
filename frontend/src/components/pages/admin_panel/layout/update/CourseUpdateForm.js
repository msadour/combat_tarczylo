import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import FormField from "../Form";
import header from "../../../../header";

class CourseUpdateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            courses: [],
            time_table: [],
        }

        this.build_timetable.bind(this);
        this.addTimeTable.bind(this);
    }

    componentDidMount(){
        axios.get('/api_tct/course/', header)
        .then(res => {
            this.setState({courses: res.data});
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
        axios.patch('/api_tct/course/' + id + '/', {'add_time_table' : this.state.time_table}, header )
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
        if (model == 'time_table') {
            var url = '/api_tct/time_table/'
        } else{
            var url = '/api_tct/course/'
        }

        event.preventDefault();
        axios.delete(url + id + '/')
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        });
        return false
    }

    build_timetable(course){
        var list_timetable_component = []

        var time_tables = course.time_table
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
                                        <button className="button" type="button" onClick={() => this.handleRemove(time_table.id)}>
                                            <label className="text_jl_button">Remove time table</label>
                                        </button>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            })
        return list_timetable_component
    }


    render() {

        var list_course_component = []

        this.state.courses.forEach( course => {

            list_course_component.push(
                <div key={course.id} className="col-md-6 m-auto">
                    <div className="card card-body mt-5">
                        <h2 className="text-center text_jl">{course.name}</h2>
                        <FormField type_input="text" model="course" id={course.id} field="name" label="Name" value={course.name} />
                        <FormField type_input="textarea" model="course" id={course.id} field="description" label="Description" value={course.description} />
                        <FormField type_input="text" model="course" id={course.id} field="place" label="Place" value={course.place} />
                        <FormField type_input="text" model="course" id={course.id} field="level" label="Level" value={course.level} />
                        <FormField type_input="text" model="course" id={course.id} field="category" label="Category" value={course.category} />

                        <FormField type_input="choice" model_value_possible="instructor" model="course" id={course.id} field="instructor" label="Instructor" value={course.instructor} />

                        {this.build_timetable(course)}

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
                                          <button className="button" type="button" onClick={() => this.handleRemoveTimeTable(index)}>
                                            <label className="text_jl">Remove</label>
                                          </button>
                                          <button className="button" type="button" onClick={() => this.updateTimeTable(course.id)}>
                                            <label className="text_jl_button">Update new times table</label>
                                          </button>)
                                    </div>
                                )
                            })
                          }

                          <button className="button" onClick={(e) => this.addTimeTable(e)}>
                            <label className="text_jl">Add time table</label>
                          </button>
                        </div>
                        <button className="button" type="button" style={{width:"10%"}} onClick={() => this.handleRemove(course.id, 'course')}>
                            <label className="text_jl_button">Remove</label>
                        </button>
                        <br /><br />
                    </div>
                </div>
            )
        })

        return (
            <div>
                {list_course_component}
                <br /><br /><br /><br /><br /><br />
            </div>
        )
    }
}

export default CourseUpdateForm