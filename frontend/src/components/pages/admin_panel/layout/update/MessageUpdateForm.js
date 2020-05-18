import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import FormField from "../Form";

class MessageUpdateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: {}
        }
    }

    componentDidMount(){
        axios.get('/api_tct/important_message/')
        .then(res => {
            this.setState({message: res.data});
        })
        .catch(err => {
            console.log(err)
        });
    }


    render() {

        return (
            <div>

                <div >
                    <FormField type_input="text" model="important_message" id={this.state.message.id} field="content" label="content" value={this.state.message.content} />
                </div>

            </div>
        )
    }
}

export default MessageUpdateForm