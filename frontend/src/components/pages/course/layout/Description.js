import React, { Component } from "react";
import ReactDom from "react-dom";

class Description extends Component {
    render() {

        return (
            <table border="1">
                <tbody>
                    <tr >
                        <th>
                            <h1>Description</h1>
                            <p> some text </p>
                        </th>

                        <th>
                            photos
                        </th>
                    </tr>
                </tbody>

            </table>
        )
    }
}

export default Description