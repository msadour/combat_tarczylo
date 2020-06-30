import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import FormField from "./Form";
import header from "../../header";

class MemberProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            info_member: {}
        }
    }

    componentDidMount(){
        fetch('/api_tct/member/' + localStorage.getItem('member_id'), {
            method: "GET",
            headers: { 'Authorization': 'Token ' + localStorage.getItem('token') },
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            this.setState({info_member: data});
        })
        .catch(err => {
        console.log(res);
            alert('error');

        });

    }

    render() {

        return (
            <div>
                <br /><br /><br />
                      <table className="page_content" style={{backgroundColor: "white", width:"70%"}}>
                        <tbody>

                            <tr>
                                <th><br /></th>
                            </tr>

                            <tr>
                                <th><center><h2 className="text_jl">Hello {this.state.info_member.full_name}</h2></center></th>
                            </tr>

                            <tr>
                                <th><br /></th>
                            </tr>

                            <tr>
                                <th><img style={{width:"30%"}} src={this.state.info_member.picture} /></th>
                            </tr>

                            <tr>
                                <th><br /></th>
                            </tr>

                            <tr>
                                <th><FormField type_input="text" field="first_name" label="First name" value={this.state.info_member.first_name} /></th>
                            </tr>

                            <tr>
                                <th><FormField type_input="text" field="last_name" label="Last name" value={this.state.info_member.last_name} /></th>
                            </tr>

                            <tr>
                                <th><FormField type_input="text" field="email" label="Email" value={this.state.info_member.email} /></th>
                            </tr>

                            <tr>
                                <th><FormField type_input="text" field="password" label="Password" value="" /></th>
                            </tr>

                            <tr>
                                <th><FormField type_input="text" field="postal_code" label="Postal code" value={this.state.info_member.postal_code} /></th>
                            </tr>

                            <tr>
                                <th><FormField type_input="text" field="city" label="City" value={this.state.info_member.city} /></th>
                            </tr>

                            <tr>
                                <th><FormField type_input="text" field="street" label="Street" value={this.state.info_member.street} /></th>
                            </tr>

                            <tr>
                                <th><FormField type_input="text" field="country" label="Country" value={this.state.info_member.country} /></th>
                            </tr>

                            <tr>
                                <th><FormField type_input="text" field="phone" label="Phone" value={this.state.info_member.phone} /></th>
                            </tr>

                            <tr>
                                <th><FormField type_input="text" field="insurance_name" label="Insurance name" value={this.state.info_member.insurance_name} /></th>
                            </tr>

                            <tr>
                                <th><FormField type_input="text" field="insurance_number" label="Insurance number" value={this.state.info_member.insurance_number} /></th>
                            </tr>

                            <tr>
                                <th><FormField type_input="image" field="picture" label="Profile picture" /></th>
                            </tr>


                        </tbody>
                      </table>
                <br /><br /><br />
            </div>
        )
    }
}

export default MemberProfile