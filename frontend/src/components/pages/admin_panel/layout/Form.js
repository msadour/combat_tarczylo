import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import header from "../../../header";

class FormField extends Component {

    constructor(props){
        super(props);

        this.state = {
            new_value: "",
            value_possible: [],
            input: "",
        }

        this.onChange.bind(this)
        this.onSubmit.bind(this)
        this.buildInput.bind(this)
    }

    componentDidMount(){
        if (this.props.model_value_possible){
            axios.get('/api_tct/' + this.props.model_value_possible + '/', header)
            .then(res => {
                this.setState({value_possible: res.data});
            })
            .catch(err => {
                alert('error');
            });
        }
    }

    buildInput(){

        switch(this.props.type_input){
            case "text":
                return (
                    <div>
                        <input
                            type="text"
                            name="new_value"
                            onChange={e => this.onChange(e)}
                            placeholder={this.props.value}
                        />
                    </div>
                )
            break;

            case "choice":
                let optionTemplate = [<option key={0} value={0}></option>]

                this.state.value_possible.forEach(value => {
                    optionTemplate.push(<option key={value.id} value={value.id}>{value.full_name}</option>)
                })
                return (
                    <div>
                      <select
                          name="new_value"
                          type="select"
                          onChange={e => this.onChange(e)}
                      >
                        {optionTemplate}
                      </select>
                    </div>
                )


            break;

            case "radio_button":
                let option_radio_item = []

                this.props.options_radio.forEach(option => {
                    option_radio_item.push(
                        <div>
                            <input type="radio" name="{option.name}" value="{option.value}" onChange={e => this.onChange(e)} />
                            <label > {option.label} </label><br />
                        </div>
                    )
                })

                return (
                    <div>
                        {optionTemplate}
                    </div>
                )

            break;

            case "price":
                return (
                    <div>
                        <input
                            type="number"
                            step="0.01"
                            name="new_value"
                            onChange={e => this.onChange(e)}
                            placeholder={this.props.value}
                        />
                    </div>
                )
            break;

            case "number":
                return (
                    <div>
                        <input
                            type="number"
                            step="1"
                            name="new_value"
                            onChange={e => this.onChange(e)}
                            placeholder={this.props.value}
                        />
                    </div>
                )
            break;

            case "date":
                if (this.props.value){
                    return (
                        <div>
                            <input
                                type="date"
                                name="new_value"
                                placeholder="DD/MM/YYYY"
                                onChange={e => this.onChange(e)}
                                value={this.props.value}
                            />
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <input
                                type="date"
                                name="new_value"
                                placeholder="DD/MM/YYYY"
                                onChange={e => this.onChange(e)}
                                value="0000-00-00"
                            />
                        </div>
                    )
                }

            break;

        }

    }

    onSubmit = e => {

        e.preventDefault();
        const member_id = localStorage.getItem("member_id");
        var data = {}
        data[this.props.field] = this.state.new_value
        axios.patch('/api_tct/' + this.props.model + '/' + this.props.id + '/', data,
            { headers: {
                'Authorization': 'Token ' + localStorage.getItem('token')
            }, }
        )
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
                  {this.buildInput()}
                  <button type="submit" value="Submit"> Update </button>
                </form>
                <br />
            </div>
        )
    }
}

export default FormField