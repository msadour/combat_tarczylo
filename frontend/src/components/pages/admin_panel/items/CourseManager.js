import React, { Component } from "react";

import MenuManager from "../manager/MenuManager"

import CourseCreateForm from "../layout/create/CourseCreateForm"


class CourseManager extends Component {

    render() {
        return (

            <div>
                <MenuManager />
                <CourseCreateForm />
            </div>
        )
    }

}

export default CourseManager