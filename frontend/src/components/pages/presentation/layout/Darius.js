import React, { Component } from "react";
import ReactDom from "react-dom";

class Darius extends Component {
    render() {
        return (
            <div>
                <br />
                <table border="1" style={{width:"90%"}} className="page_content">
                    <tbody>
                        <tr>
                            <td style={{width:"70%"}}>
                                <h1 className="text_jl">Darius tarczylo</h1>
                                <p className="text_jl">{this.props.text}</p>
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