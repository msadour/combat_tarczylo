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

    handleRemove(id) {
        event.preventDefault();
        axios.delete('/api_tct/course/' + id + '/')
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        });
        return false
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
                    <button type="button" onClick={() => this.handleRemove(course.id)}>Remove</button>
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