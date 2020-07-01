import React, { Component } from "react";
import ReactDom from "react-dom";

class Band extends Component {
    render() {
        return (
            <div >
                <table border="0" className="page_content">
                    <tbody>
                        <tr>
                            <td >
                                <img style={{width: "100%"}} src="../../../../../media/band_presentation.png" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Band