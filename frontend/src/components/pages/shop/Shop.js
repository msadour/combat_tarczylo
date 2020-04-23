import React, { Component } from "react";
import ReactDom from "react-dom";

import Header from "./layout/Header";
import Category from "./layout/Category";

class Shop extends Component {
    render() {

        return (
            <div>
                <Header />
                <br />
                <Category />
            </div>

        )
    }
}

export default Shop