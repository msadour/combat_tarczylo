import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import FormField from "../Form";
import header from "../../../../header";

class PresentationUpdateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            presentation: {}
        }
    }

    componentDidMount(){
        axios.get('/api_tct/presentation/', header)
        .then(res => {
            this.setState({presentation: res.data});
        })
        .catch(err => {
            console.log(err)
        });
    }


    render() {

        return (
            <div className="col-md-6 m-auto">

                <div className="card card-body mt-5">
                    <h2 className="text-center text_jl">Presentation</h2>
                    <FormField type_input="text" model="presentation" id={this.state.presentation.id} field="name_club" label="Name of club" value={this.state.presentation.name_club} />
                    <FormField type_input="textarea" model="presentation" id={this.state.presentation.id} field="tct" label="TCT" value={this.state.presentation.tct} />
                    <FormField type_input="textarea" model="presentation" id={this.state.presentation.id} field="darius" label="Darius" value={this.state.presentation.darius} />
                    <FormField type_input="textarea" model="presentation" id={this.state.presentation.id} field="technical" label="Technical" value={this.state.presentation.technical} />
                </div>

            </div>
        )
    }
}

export default PresentationUpdateForm