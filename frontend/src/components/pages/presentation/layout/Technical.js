import React, { Component } from "react";
import ReactDom from "react-dom";

class Technical extends Component {
    render() {
        return (
            <div>
                <br />
                <table border="1" style={{width:"90%"}}>
                    <tbody>
                        <tr>
                            <td>
                                <img id="img_technical" src="../../../../media/technical.png" />
                            </td>

                            <td>
                                <h1 className="text_jl">What are technical that I teach?</h1>
                                <p className="text_jl">{this.props.text}</p>

                            </td>
                        </tr>
                    </tbody>
                </table>
                <br />
            </div>
        )
    }
}

export default Technical