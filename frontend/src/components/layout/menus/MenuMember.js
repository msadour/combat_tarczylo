import React, { Component } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Link } from "react-router-dom";
import axios from 'axios';

class MenuMember extends Component {

    constructor(props){
        super(props);
        this.logout.bind(this);
    }

    logout = e => {
        e.preventDefault();
        axios.post('/api_tct/logout/')
        .then(res => {
            localStorage.removeItem('jwt');
            localStorage.removeItem('username');
        })
        window.location.reload();
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
                        <p className="nav-link">Profile</p>

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

export default MenuMember