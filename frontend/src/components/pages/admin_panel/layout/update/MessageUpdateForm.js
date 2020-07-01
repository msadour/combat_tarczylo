import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import FormField from "../Form";
import header from "../../../../header";

class MessageUpdateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: {}
        }
    }

    componentDidMount(){
        axios.get('/api_tct/important_message/', header)
        .then(res => {
            this.setState({message: res.data});
        })
        .catch(err => {
            console.log(err)
        });
    }


    render() {
        var options_radio = [
            {'name': 'false', 'value': true, 'label': 'Yes'},
            {'name': 'true', 'value': false, 'label': 'No'}
        ]

        return (
            <div className="col-md-6 m-auto">

                <div className="card card-body mt-5">
                    <h2 className="text-center text_jl">Important message</h2>
                    <FormField type_input="textarea" model="important_message" id={this.state.message.id} field="content" label="Content" value={this.state.message.content} />
                    <FormField type_input="radio_button" model="important_message" id={this.state.message.id} field="is_active" label="Is active?" options_radio={options_radio} />
                </div>

            </div>
        )
    }
}

export default MessageUpdateForm