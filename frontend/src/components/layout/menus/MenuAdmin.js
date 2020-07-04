import React, { Component } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Link, withRouter } from "react-router-dom";
import axios from 'axios';

import MemberProfile from "../../pages/member/MemberProfile"

class MenuAdmin extends Component {

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
            alert(err)
        });
    }

    render() {
        return (
            <div className="main_menu">
                <br /> <br /> <br /> <br />
                <table className="table_main_menu">
                    <tbody>
                        <tr>
                            <th>
                                <Link to='/'>
                                    <p className="nav-link text_jl">Home</p>
                                </Link>
                            </th>

                            <th>
                                <Link to='/admin_panel_member'>
                                    <p className="nav-link text_jl">Admin panel</p>
                                </Link>

                            </th>

                            <th>
                                <Link to='/member_profile'>
                                    <p className="nav-link text_jl">Profile</p>
                                </Link>
                            </th>

                            <th>
                                <Link to='/presentation'>
                                    <p className="nav-link text_jl">Presentation</p>
                                </Link>
                            </th>

                            <th>
                                <Link to='/training'>
                                    <p className="nav-link text_jl">Trainings</p>
                                </Link>
                            </th>

                            <th>
                                <Link to='/shop'>
                                    <p className="nav-link text_jl">Store</p>
                                </Link>
                            </th>

                            <th>
                                <Link to='/book'>
                                    <p className="nav-link text_jl">Books</p>
                                </Link>
                            </th>

                            <th>
                                <Link to='/blog'>
                                    <p className="nav-link text_jl">Blog</p>
                                </Link>
                            </th>

                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default withRouter(MenuAdmin)