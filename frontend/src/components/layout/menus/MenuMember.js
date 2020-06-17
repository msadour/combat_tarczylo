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
            <nav className="navbar navbar-expand-lg navbar-expand-sm navbar-light bg-light">
              <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                      <li className="nav-item active">
                          <Link to='/' className="nav-link">
                            <p className="nav-link">Home</p>
                        </Link>
                      </li>

                      <li className="nav-item active">
                        <Link to='/member_profile' className="nav-link">
                            <p className="nav-link">Profile</p>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to='/presentation' className="nav-link">
                            <p className="nav-link">Presentation</p>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to='/training' className="nav-link">
                            <p className="nav-link">Trainings</p>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to='/shop' className="nav-link">
                            <p className="nav-link">Store</p>
                        </Link>
                      </li>

                </ul>
              </div>
            </nav>
        )
    }
}

export default withRouter(MenuMember)