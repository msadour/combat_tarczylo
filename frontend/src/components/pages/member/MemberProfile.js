import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import FormField from "./layout/Form";

class MemberProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            info_member: {}
        }
    }

    componentDidMount(){
        const member_id = localStorage.getItem("member_id");
        const jwt = localStorage.getItem("token");
        axios.get('/api_tct/member/' + member_id)
        .then(res => {
            this.setState({info_member: res.data});
        })
        .catch(err => {
            console.log(err)
        });
    }

    render() {

        return (
            <div>
                <h2>Hello {this.state.info_member.full_name}</h2>

                <FormField field="first_name" label="First name" value={this.state.info_member.first_name} />

                <FormField field="last_name" label="Last name" value={this.state.info_member.last_name} />

                <FormField field="email" label="Email" value={this.state.info_member.email} />

                <FormField field="password" label="Password" value="" />

                <FormField field="postal_code" label="Postal code" value={this.state.info_member.postal_code} />

                <FormField field="city" label="City" value={this.state.info_member.city} />

                <FormField field="street" label="Street" value={this.state.info_member.street} />

                <FormField field="country" label="Country" value={this.state.info_member.country} />

                <FormField field="phone" label="Phone" value={this.state.info_member.phone} />

                <FormField field="insurance_name" label="Insurance name" value={this.state.info_member.insurance_name} />

                <FormField field="insurance_number" label="Insurance number" value={this.state.info_member.insurance_number} />
            </div>
        )
    }
}

export default MemberProfile