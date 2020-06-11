import React, { Component } from "react";
import ReactDom from "react-dom";

import Band from "./layout/Band";
import ListCourse from "./layout/ListCourse";
import Description from "../../layout/DescriptionClub";
import CourseDetail from "./CourseDetail"

class Course extends Component {

    constructor() {
        super()
        this.state = {
            courses: []
        }
    }

    componentDidMount() {
        fetch('/api_tct/course/')
        .then(response => response.json())
        .then((data) => {
            this.setState({ courses: data })
        })
    }

    render() {

        return (
            <div>
                <Band />
                <br />
                <Description />
                <br />
                <CourseDetail courses={this.state.courses} />
            </div>
        )
    }
}

export default Course