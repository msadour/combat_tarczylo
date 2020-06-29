import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import header from "../../header";

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

        switch(this.props.field) {
            case "first_name":
              axios.patch('/api_tct/member/' + member_id + '/', { "first_name" : this.state.new_value }, header)
              .then(res => {
                window.location.reload();
            });
            break;

            case "last_name":
              axios.patch('/api_tct/member/' + member_id + '/', { "last_name": this.state.new_value }, header)
              .then(res => {
                window.location.reload();
             });
            break;

            case "email":
              axios.patch('/api_tct/member/' + member_id + '/', { "email" : this.state.new_value }, header)
              .then(res => {
                window.location.reload();
             });
            break;

            case "password":
              axios.patch('/api_tct/member/' + member_id + '/', { "password": this.state.new_value }, header)
              .then(res => {
                window.location.reload();
             });
            break;

            case "postal_code":
              axios.patch('/api_tct/member/' + member_id + '/', { "postal_code" : this.state.new_value }, header)
              .then(res => {
                window.location.reload();
             });
            break;

            case "city":
              axios.patch('/api_tct/member/' + member_id + '/', { "city" : this.state.new_value }, header)
              .then(res => {
                window.location.reload();
             });
            break;

            case "street":
              axios.patch('/api_tct/member/' + member_id + '/', { "street" : this.state.new_value }, header)
              .then(res => {
                window.location.reload();
             });
            break;

            case "country":
              axios.patch('/api_tct/member/' + member_id + '/', { "country" : this.state.new_value }, header)
              .then(res => {
                window.location.reload();
             });
             break;

            case "phone":
              axios.patch('/api_tct/member/' + member_id + '/', { "phone" : this.state.new_value }, header)
              .then(res => {
                window.location.reload();
            });
            break;

            case "insurance_name":
              axios.patch('/api_tct/member/' + member_id + '/', { "insurance_name": this.state.new_value }, header)
              .then(res => {
                window.location.reload();
            });
            break;

             case "insurance_number":
              axios.patch('/api_tct/member/' + member_id + '/', { "insurance_number": this.state.new_value }, header)
              .then(res => {
                window.location.reload();
             });
             break;


              case "picture":
                const formData = new FormData();

                formData.append(
                    this.props.field,
                    e.target[0].files[0],
                    e.target[0].files[0].name
                );
                axios.patch('/api_tct/member/' + member_id + '/upload/', formData,
                    { headers: {
                        'Authorization': 'Token ' + localStorage.getItem('token'),
                        'Content-Disposition': 'attachment; filename=pics.png'
                    }, }
                )
                .then(res => {
                    window.location.reload();
                })
             break;

             default :
                alert('error');
        }

    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {

        return (
            <div>
                <form onSubmit={e => this.onSubmit(e)}>
                  <table border="1" style={{width: '30%'}} className="page_content">
                    <tbody>
                        <tr>
                            <th style={{width: '30%'}}> <label className="text_jl">{this.props.label}: </label> </th>
                            <th>
                                { this.props.type_input == "image" ? (
                                    <input
                                        type='file'
                                        style={{width: '100%'}}
                                        onChange={e => this.onChange(e)}
                                     />
                                ) : (
                                    <input
                                        type='text'
                                        name="new_value"
                                        style={{width: '100%'}}
                                        onChange={e => this.onChange(e)}
                                        placeholder={this.props.value}
                                     />
                                )}

                            </th>
                            <th> <button type="submit" value="Submit"> Update </button> </th>
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