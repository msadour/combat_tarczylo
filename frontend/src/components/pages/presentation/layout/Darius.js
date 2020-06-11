import React, { Component } from "react";
import ReactDom from "react-dom";

class Darius extends Component {
    render() {
        return (
            <div>
                <table border="1">
                    <tbody>
                        <tr>
                            <td>
                                <h1>Darius tarczylo</h1>
                                <p>{this.props.text}</p>
                            </td>

                            <td>
                                Photo
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Darius