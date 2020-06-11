import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import header from "../../header";
import TrainingDetail from "./TrainingDetail";
import Description from "../../layout/DescriptionClub";

class Training extends Component {

    constructor() {
        super()
        this.state = {
            trainings: []
        }
    }

    componentDidMount() {
        fetch('/api_tct/internship/')
            .then(response => response.json())
            .then((data) => {
                this.setState({ trainings: data })
            })
    }

    render() {
        return (
            <div>
                <Description />
                <br />
                <TrainingDetail trainings={this.state.trainings} />

            </div>
        )
    }
}

export default Training