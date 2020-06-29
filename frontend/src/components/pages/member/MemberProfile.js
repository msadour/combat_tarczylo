import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import FormField from "./layout/Form";
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
                <br />
                <h2><center>Hello {this.state.info_member.full_name}</center></h2> <br />

                <img style={{width:"50%"}} src={this.state.info_member.picture} /><br />

                <FormField type_input="text" field="first_name" label="First name" value={this.state.info_member.first_name} />

                <FormField type_input="text" field="last_name" label="Last name" value={this.state.info_member.last_name} />

                <FormField type_input="text" field="email" label="Email" value={this.state.info_member.email} />

                <FormField type_input="text" field="password" label="Password" value="" />

                <FormField type_input="text" field="postal_code" label="Postal code" value={this.state.info_member.postal_code} />

                <FormField type_input="text" field="city" label="City" value={this.state.info_member.city} />

                <FormField type_input="text" field="street" label="Street" value={this.state.info_member.street} />

                <FormField type_input="text" field="country" label="Country" value={this.state.info_member.country} />

                <FormField type_input="text" field="phone" label="Phone" value={this.state.info_member.phone} />

                <FormField type_input="text" field="insurance_name" label="Insurance name" value={this.state.info_member.insurance_name} />

                <FormField type_input="text" field="insurance_number" label="Insurance number" value={this.state.info_member.insurance_number} />

                <FormField type_input="image" field="picture" label="Profile picture" />
                <br />
            </div>
        )
    }
}

export default MemberProfile