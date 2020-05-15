import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

class FormField extends Component {

    constructor(props){
        super(props);

        this.state = {
            new_value: "",
        }

        this.onChange.bind(this)
        this.onSubmit.bind(this)
    }

    onSubmit = e => {
        e.preventDefault();
        const member_id = localStorage.getItem("member_id");
        var data = {}
        data[this.props.field] = this.state.new_value
        axios.patch('/api_tct/' + this.props.model + '/' + this.props.id + '/',  data)
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err)
        });

    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {

        return (
            <div>
                <form onSubmit={e => this.onSubmit(e)}>
                  <label >{this.props.label}: </label>
                  <input
                        type="text"
                        name="new_value"
                        onChange={e => this.onChange(e)}
                        placeholder={this.props.value}
                   />
                  <button type="submit" value="Submit"> Update </button>
                </form>
                <br />
            </div>
        )
    }
}

export default FormField