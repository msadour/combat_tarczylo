import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import TextField from '@material-ui/core/TextField';

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
                        <TextField
                            type="text"
                            name="new_value"
                            style = {{width: 500}}
                            variant="outlined"
                            onChange={e => this.onChange(e)}
                            defaultValue={this.props.value}
                        />
                    </div>
                )
            break;

            case "textarea":
                return (
                    <div>
                        <textarea
                            type="text"
                            name="new_value"
                            cols="50"
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
                        <div key={option.name}>
                            <input type="radio" name="new_value" value={option.value} onChange={e => this.onChange(e)} />
                            <label className="text_jl"> {option.label} </label><br />
                        </div>
                    )
                })

                return (
                    <div>
                        {option_radio_item}
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

            case "image":
                return (
                    <div>
                        <input
                            type="file"
                            name="new_value"
                            onChange={e => this.onChange(e)}
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
        var data = {};
        data[this.props.field] = this.state.new_value;
        var url = '/api_tct/' + this.props.model + '/' + this.props.id + '/';
        if (e.target[0].type == 'file'){
            url += 'upload/';
            const formData = new FormData();

            formData.append(
                this.props.field,
                e.target[0].files[0],
                e.target[0].files[0].name
              );
            axios.patch(url, formData,
                { headers: {
                    'Authorization': 'Token ' + localStorage.getItem('token'),
                    'Content-Disposition': 'attachment; filename=pics.png'
                }, }
            )
            .then(res => {
                window.location.reload();
            })
            .catch(err => {
                console.log(err)
            });
        } else {
                axios.patch(url, data,
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
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {

        return (
            <div className="col-md-6">
                <form onSubmit={e => this.onSubmit(e)}>
                  <table border="0" className="form_update_admin_panel">
                    <tbody>
                      <tr>
                        <th>
                            <label className="text_jl">{this.props.label}: </label>
                        </th>

                        <th>
                            {this.buildInput()}
                        </th>

                        <th>
                            <button type="submit" value="Submit" className="button">
                                <label className="text_jl_button">Update</label>
                            </button>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </form>
                <br />
            </div>
        )
    }
}

export default FormField