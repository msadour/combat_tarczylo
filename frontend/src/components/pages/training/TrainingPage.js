import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import header from "../../header";
import TrainingDetail from "./TrainingDetail";
import Description from "../../layout/DescriptionClub";
import CourseDetail from "./CourseDetail"

class Training extends Component {

    constructor() {
        super()
        this.state = {
            trainings: [],
            courses: []
        }
    }

    componentDidMount() {
        fetch('/api_tct/internship/')
        .then(response => response.json())
        .then((data) => {
            this.setState({ trainings: data })
        })

        fetch('/api_tct/course/')
        .then(response => response.json())
        .then((data) => {
            this.setState({ courses: data })
        })
    }

    render() {
        return (
            <div>
                <Description />
                <CourseDetail courses={this.state.courses} />
                <TrainingDetail trainings={this.state.trainings} />
            </div>
        )
    }
}

export default Training