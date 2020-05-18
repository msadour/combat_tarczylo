import React, { Component } from "react";

import MenuManager from "../manager/MenuManager"

import CourseCreateForm from "../layout/create/CourseCreateForm"
import CourseUpdateForm from "../layout/update/CourseUpdateForm"


class CourseManager extends Component {

    render() {
        return (

            <div>
                <MenuManager />
                <CourseCreateForm />
                <CourseUpdateForm />
            </div>
        )
    }

}

export default CourseManager