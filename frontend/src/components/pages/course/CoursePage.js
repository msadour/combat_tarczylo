import React, { Component } from "react";
import ReactDom from "react-dom";

import Band from "./layout/Band";
import Description from "./layout/Description";
import ListCourse from "./layout/ListCourse";

class Course extends Component {
    render() {

        return (
            <div>
                <Band />
                <br />
                <Description />
                <br />
                <ListCourse />
            </div>
        )
    }
}

export default Course