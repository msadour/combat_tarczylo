import React, { Component } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Link } from "react-router-dom";

class MenuGuest extends Component {
    render() {
        return (

            <div>
                <table style={{float: "right"}}>
                    <tbody>
                        <tr>
                            <th>
                                <Link to='/looking_for'>
                                    <p className="nav-link text_jl">Looking for</p>
                                </Link>
                            </th>

                            <th>
                                <Link to='/contact'>
                                    <p className="nav-link text_jl">Contact</p>
                                </Link>

                            </th>

                            <th>
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