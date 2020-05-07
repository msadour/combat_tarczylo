import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

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

                <h2>Hello</h2>




            </div>
        )
    }
}

export default MemberProfile