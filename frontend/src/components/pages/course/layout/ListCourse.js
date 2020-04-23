import React, { Component } from "react";
import ReactDom from "react-dom";

class ListCourse extends Component {
    render() {

        return (
            <table border="1">
                <tbody>
                    <tr >
                        <th colSpan={3}>
                            <h1>Training</h1>
                        </th>
                    </tr>

                    <tr>
                        <th colSpan={3}>
                            <h1>photo</h1>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <p>Training men </p>
                        </th>

                        <th>
                            <p>Training women </p>
                        </th>

                        <th>
                            <p>Training teenager </p>
                        </th>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default ListCourse