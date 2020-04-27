import React, { Component } from "react";
import ReactDom from "react-dom";

import Planning from "./layout/Planning"

class Training extends Component {

    constructor() {
        super()
        this.state = {
            trainings: []
        }
    }

    componentDidMount() {
        fetch('http://0.0.0.0:8000/api/course')
            .then(response => response.json())
            .then((data) => {
                this.setState({ trainings: data })
            })
    }

    render() {
        return (
            <div>
                <h1> Description </h1>
                text....

                <br />

                <Planning trainings={this.state.trainings} />

            </div>
        )
    }
}

export default Training