import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import FormField from "../Form";

class PresentationUpdateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            presentation: {}
        }
    }

    componentDidMount(){
        axios.get('/api_tct/presentation/')
        .then(res => {
            this.setState({presentation: res.data});
        })
        .catch(err => {
            console.log(err)
        });
    }


    render() {

        return (
            <div>

                <div >
                    <FormField type_input="text" model="presentation" id={this.state.presentation.id} field="tct" label="tct" value={this.state.presentation.tct} />
                    <FormField type_input="text" model="presentation" id={this.state.presentation.id} field="darius" label="darius" value={this.state.presentation.darius} />
                    <FormField type_input="text" model="presentation" id={this.state.presentation.id} field="technical" label="technical" value={this.state.presentation.technical} />
                </div>

            </div>
        )
    }
}

export default PresentationUpdateForm