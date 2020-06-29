import React, { Component } from "react";
import ReactDom from "react-dom";

class Tct extends Component {
    render() {
        return (
            <div>
                <br />
                <table border="1" style={{width:"90%"}}>
                    <tbody>
                        <tr>
                            <td style={{width:"70%"}}>
                                <h1 className="text_jl">{this.props.name}</h1>
                                <p className="text_jl">{this.props.text}</p>
                            </td>

                            <td>
                                <img id="img_tct" src="../../../../media/club_tct.png" />
                            </td>

                        </tr>
                    </tbody>
                </table>
                <br />
            </div>
        )
    }
}

export default Tct