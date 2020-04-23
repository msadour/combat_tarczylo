import React, { Component } from "react";
import ReactDom from "react-dom";

import Product from "./Product"

class Category extends Component {
    render() {
        return (
            <table border={1}>
                <tbody>
                    <tr >
                        <td colSpan={5}>
                            image category product
                        </td>
                    </tr>

                    <tr>
                        <td><Product /></td>
                        <td><Product /></td>
                        <td><Product /></td>
                        <td><Product /></td>
                        <td>...</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default Category