import React, { Component } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Link } from "react-router-dom";

class MenuGuest extends Component {
    render() {
        return (

            <div>
                <table border="0" style={{float: "right", width: "25%"}}>
                    <tbody>
                        <tr>
                            <th>
                                <Link to='/'>
                                    <img style={{width: "50%", float: "right", marginBottom: "15%"}} src="../../../../../media/logo.png" />
                                </Link>
                            </th>

                            <th>
                                <Link to='/looking_for'>
                                    <img style={{width: "50%", float: "right", marginBottom: "15%"}} src="../../../../../media/search_icon.png" />
                                </Link>
                            </th>

                            <th style={{width: "30%"}}>
                                <Link to='/contact'>
                                    <p className="nav-link text_jl">Contact</p>
                                </Link>

                            </th>

                            <th style={{width: "50%"}}>
                                <Link to='/authentication'>
                                    <p className="nav-link text_jl">Access Member</p>
                                </Link>
                            </th>

                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default MenuGuest