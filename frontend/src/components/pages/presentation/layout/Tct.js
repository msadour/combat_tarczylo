import React, { Component } from "react";
import ReactDom from "react-dom";

class Tct extends Component {
    render() {
        return (
            <div >
                <br />
                <table border="0" className="page_content" style={{'background-color': '#FFFFFF'}}>
                    <tbody>
                        <tr>
                            <td style={{width:"60%"}}>
                                <h3 className="text_jl">{this.props.name}</h3>
                                <hr className="hr_presentation" style={{width: "5%"}}/>
                                <p className="text_presentation">{this.props.text}</p>
                            </td>

                            <td>
                                <img id="img_tct" src="../../../../media/club_tct.png" />
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Tct