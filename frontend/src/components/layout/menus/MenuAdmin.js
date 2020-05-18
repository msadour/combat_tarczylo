import React, { Component } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Link } from "react-router-dom";
import axios from 'axios';

import MemberProfile from "../../pages/member/MemberProfile"

class MenuAdmin extends Component {

    constructor(props){
        super(props);
        this.logout.bind(this);
    }

    logout = e => {
        e.preventDefault();
        axios.post('/api_tct/logout/')
        .then(res => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('member_id');
        })
        window.location.reload();
        this.props.history.push("/");
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
                        <Link to='/admin_panel_member' className="nav-link">
                            <p className="nav-link">Admin panel</p>
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
                        <Link to='/course' className="nav-link">
                            <p className="nav-link">Course</p>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to='/shop' className="nav-link">
                            <p className="nav-link">Store</p>
                        </Link>
                      </li>


                      <li className="nav-item">
                        <Link to='/looking_for' className="nav-link">
                            <p className="nav-link">Looking for</p>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to='/contact' className="nav-link">
                            <p className="nav-link">Contact</p>
                        </Link>
                      </li>

                      <li className="nav-item active">
                        <Link to='/' className="nav-link">
                            <p className="nav-link" onClick={this.logout}>Logout</p>
                        </Link>
                      </li>

                </ul>
              </div>
            </nav>
        )
    }
}

export default MenuAdmin