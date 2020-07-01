import React, { Component } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Link, withRouter } from "react-router-dom";
import axios from 'axios';

import MemberProfile from "../../pages/member/MemberProfile"

class MenuMember extends Component {

    constructor(props){
        super(props);
        this.logout.bind(this);
    }

    logout = e => {
        e.preventDefault();
        fetch('/api_tct/logout/', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })
        .then(res => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('member_id');
            this.props.history.push("/");
            window.location.reload();
        })
        .catch(err => {
            alert(err);
            console.log(err)
        });
    }

    render() {
        return (
            <div>
                <table border="0" style={{float: "right", width: "20%"}}>
                    <tbody>
                        <tr>
                            <th>
                                <Link to='/'>
                                    <img style={{width: "30%", float: "right", marginBottom: "15%"}} src="../../../../../media/logo.png" />
                                </Link>
                            </th>

                            <th>
                                <Link to='/looking_for'>
                                    <img style={{width: "35%", float: "right", marginBottom: "15%"}} src="../../../../../media/search_icon.png" />
                                </Link>
                            </th>

                            <th>
                                <Link to='/contact'>
                                    <p className="nav-link text_jl">Contact</p>
                                </Link>

                            </th>

                            <th>
                                <Link to='/'>
                                    <p className="nav-link text_jl" onClick={this.logout}>Logout</p>
                                </Link>
                            </th>

                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default withRouter(MenuMember)