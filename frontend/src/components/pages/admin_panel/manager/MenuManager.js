import React, { Component } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Link } from "react-router-dom";
import axios from 'axios';

class MenuManager extends Component {

    constructor(props){
        super(props);
        this.refreshClick.bind(this)
    }

    refreshClick = e => {
        e.preventDefault();
        window.location.reload(true)
    }


    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-expand-sm navbar-light bg-light">
              <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                      <li className="nav-item active">
                          <Link
                            to='admin_panel_member'
                            className="nav-link"
                          >
                            <p className="nav-link" >Member</p>
                        </Link>
                      </li>

                      <li className="nav-item active">
                          <Link
                          to='admin_panel_article'
                          className="nav-link">
                            <p className="nav-link" >Article</p>
                        </Link>
                      </li>

                        <li className="nav-item active">
                          <Link to='admin_panel_presentation' className="nav-link">
                            <p className="nav-link">Presentation</p>
                        </Link>
                      </li>

                    <li className="nav-item active">
                          <Link to='admin_panel_product' className="nav-link">
                            <p className="nav-link">Product</p>
                        </Link>
                      </li>

                        <li className="nav-item active">
                          <Link to='admin_panel_product_category' className="nav-link">
                            <p className="nav-link">Product category</p>
                        </Link>
                      </li>

                        <li className="nav-item active">
                          <Link to='admin_panel_course' className="nav-link">
                            <p className="nav-link">Course</p>
                        </Link>
                      </li>

                        <li className="nav-item active">
                          <Link to='admin_panel_internship' className="nav-link">
                            <p className="nav-link">Internship</p>
                        </Link>
                      </li>

                        <li className="nav-item active">
                          <Link to='admin_panel_important_message' className="nav-link">
                            <p className="nav-link">Message</p>
                        </Link>
                      </li>

                    <li className="nav-item active">
                          <Link to='admin_panel_club' className="nav-link">
                            <p className="nav-link">Club information</p>
                        </Link>
                      </li>

                        <li className="nav-item active">
                          <Link to='admin_panel_book' className="nav-link">
                            <p className="nav-link">Book</p>
                        </Link>
                      </li>

                </ul>
              </div>
            </nav>
        )
    }
}

export default MenuManager
