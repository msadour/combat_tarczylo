import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import FormField from "../Form";

class CourseUpdateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            courses: []
        }

        this.build_timetable.bind(this)
    }

    componentDidMount(){
        axios.get('/api_tct/course/')
        .then(res => {
            this.setState({courses: res.data});
        })
        .catch(err => {
            console.log(err)
        });
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
                    <h2>{time_table.name}</h2>
                    <FormField model="time_table" id={time_table.id} field="time_table_str" label="time table" value={time_table.time_table_str} />
                    <button type="button" onClick={() => this.handleRemove(time_table.id, 'time_table')}>Remove time table</button>
                </div>
            )
        })
        return list_timetable_component
    }


    render() {
    
        var list_course_component = []

        this.state.courses.forEach( course => {

            list_course_component.push(
                <div key={course.id}>
                    <h2>{course.name}</h2>
                    <FormField model="course" id={course.id} field="name" label="name" value={course.name} />
                    <FormField model="course" id={course.id} field="description" label="description" value={course.description} />
                    <FormField model="course" id={course.id} field="place" label="place" value={course.place} />
                    <FormField model="course" id={course.id} field="level" label="level" value={course.level} />
                    <FormField model="course" id={course.id} field="category" label="category" value={course.category} />
                    {this.build_timetable(course)}
                    <button type="button" onClick={() => this.handleRemove(course.id, 'course')}>Remove course</button>
                    <br /><br />
                </div>
            )
        })

        return (
            <div>
                {list_course_component}
            </div>
        )
    }
}

export default CourseUpdateForm