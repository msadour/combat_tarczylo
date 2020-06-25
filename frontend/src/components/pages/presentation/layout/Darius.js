import React, { Component } from "react";
import ReactDom from "react-dom";

class Darius extends Component {
    render() {
        return (
            <div>
                <br />
                <table border="1" style={{width:"90%"}}>
                    <tbody>
                        <tr>
                            <td style={{width:"70%"}}>
                                <h1>Darius tarczylo</h1>
                                <p>{this.props.text}</p>
                            </td>

                            <td>
                                <img id="img_darius" src="../../../../media/darius.png" />
                            </td>

                        </tr>
                    </tbody>
                </table>
                <br />
            </div>
        )
    }
}

export default Darius