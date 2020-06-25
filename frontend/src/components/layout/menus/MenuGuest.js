import React, { Component } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Link } from "react-router-dom";

class MenuGuest extends Component {
    render() {
        return (
            <div>
                <table >
                    <tbody>
                        <tr>
                            <th>
                                <Link to='/'>
                                    <p className="nav-link">Home</p>
                                </Link>
                            </th>

                            <th>
                                <Link to='/presentation'>
                                    <p className="nav-link">Presentation</p>
                                </Link>
                            </th>

                            <th>
                                <Link to='/training'>
                                    <p className="nav-link">Trainings</p>
                                </Link>
                            </th>

                            <th>
                                <Link to='/shop' >
                                    <p className="nav-link">Store</p>
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