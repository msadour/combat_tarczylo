import React, { Component } from "react";
import ReactDom from "react-dom";

class Header extends Component {
    render() {

        return (
            <table border={1}>
                <tbody>
                    <tr >
                        <td colSpan={3}>
                            image + STORE
                        </td>
                    </tr>

                    <tr>
                        <td>T-shirts</td>
                        <td>Equipments</td>
                        <td>...</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default Header