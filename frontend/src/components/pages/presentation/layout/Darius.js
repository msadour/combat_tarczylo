import React, { Component } from "react";
import ReactDom from "react-dom";

class Darius extends Component {
    render() {
        return (
            <div >
                <table border="0" className="page_content" style={{backgroundColor: '#FFFFFF'}}>
                    <tbody>
                        <tr>
                            <td>
                                <img id="img_darius" src="../../../../media/darius.png" />
                            </td>
                            <td style={{width:"60%"}}>
                                <h3 className="text_jl">Darius tarczylo</h3>
                                <hr className="hr_presentation" style={{width: "15%"}} />
                                <p className="text_presentation">{this.props.text}</p>
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Darius