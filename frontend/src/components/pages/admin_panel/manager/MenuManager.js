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
                            className="nav-link text_jl"
                          >
                            <p className="nav-link text_jl" >Member</p>
                        </Link>
                      </li>

                      <li className="nav-item active">
                          <Link
                          to='admin_panel_article'
                          className="nav-link">
                            <p className="nav-link text_jl" >Article</p>
                        </Link>
                      </li>

                        <li className="nav-item active">
                          <Link to='admin_panel_presentation' className="nav-link">
                            <p className="nav-link text_jl">Presentation</p>
                        </Link>
                      </li>

                    <li className="nav-item active">
                          <Link to='admin_panel_product' className="nav-link">
                            <p className="nav-link text_jl">Product</p>
                        </Link>
                      </li>

                        <li className="nav-item active">
                          <Link to='admin_panel_product_category' className="nav-link">
                            <p className="nav-link text_jl">Product category</p>
                        </Link>
                      </li>

                        <li className="nav-item active">
                          <Link to='admin_panel_course' className="nav-link">
                            <p className="nav-link text_jl">Course</p>
                        </Link>
                      </li>

                        <li className="nav-item active">
                          <Link to='admin_panel_internship' className="nav-link">
                            <p className="nav-link text_jl">Internship</p>
                        </Link>
                      </li>

                        <li className="nav-item active">
                          <Link to='admin_panel_important_message' className="nav-link">
                            <p className="nav-link text_jl">Message</p>
                        </Link>
                      </li>

                    <li className="nav-item active">
                          <Link to='admin_panel_club' className="nav-link">
                            <p className="nav-link text_jl">Club information</p>
                        </Link>
                      </li>

                        <li className="nav-item active">
                          <Link to='admin_panel_book' className="nav-link">
                            <p className="nav-link text_jl">Book</p>
                        </Link>
                      </li>

                </ul>
              </div>
            </nav>
        )
    }
}

export default MenuManager
