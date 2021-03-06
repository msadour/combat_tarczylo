import React, { Component } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Link } from "react-router-dom";

class MenuGuest extends Component {
    render() {
        return (
            <div className="main_menu">
                <table className="table_main_menu">
                    <tbody>
                        <tr>
                            <th>
                                <Link to='/'>
                                    <p className="nav-link text_jl">Home</p>
                                </Link>
                            </th>

                            <th>
                                <Link to='/presentation'>
                                    <p className="nav-link text_jl">Presentations</p>
                                </Link>
                            </th>

                            <th>
                                <Link to='/training'>
                                    <p className="nav-link text_jl">Trainings</p>
                                </Link>
                            </th>

                            <th>
                                <Link to='/shop' >
                                    <p className="nav-link text_jl">Store</p>
                                </Link>
                            </th>

                            <th>
                                <Link to='/subscription' >
                                    <p className="nav-link text_jl">Registration</p>
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