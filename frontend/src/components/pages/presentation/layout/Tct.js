import React, { Component } from "react";
import ReactDom from "react-dom";

class Tct extends Component {
    render() {
        return (
            <div>
                <table border="1">
                    <tbody>
                        <tr>
                            <td>
                                <h1>Presentation</h1>
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

export default Tct