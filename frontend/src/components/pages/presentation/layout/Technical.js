import React, { Component } from "react";
import ReactDom from "react-dom";

class Technical extends Component {
    render() {
        return (
            <div >
                <table border="0" className="page_content" style={{backgroundColor: '#FFFFFF'}}>
                    <tbody>
                        <tr>

                            <td style={{width:"60%"}}>
                                <h3 className="text_jl">What are technical that I teach?</h3>
                                <hr className="hr_presentation" style={{width: "35%"}} />
                                <p className="text_presentation">{this.props.text}</p>
                            </td>

                            <td>
                                <img id="img_technical" src="../../../../media/technical.png" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <br /><br />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br /><br /><br />
            </div>
        )
    }
}

export default Technical