import React, { Component } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Link } from "react-router-dom";

class MenuGuest extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-expand-sm navbar-light bg-light">
              <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">

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

                      <li className="nav-item">
                        <Link to='/authentication' className="nav-link">
                            <p className="nav-link">Access Member</p>
                        </Link>
                      </li>

                </ul>
              </div>
            </nav>
        )
    }
}

export default MenuGuest