import React, { Component } from "react";
import ReactDom from "react-dom";

import Header from "./layout/Header";
import Category from "./layout/Category";
import Product from "./layout/Product";

class Shop extends Component {

    constructor() {
        super()
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        fetch('http://0.0.0.0:8000/api/product')
            .then(response => response.json())
            .then((data) => {
                this.setState({ products: data })
            })
    }

    render() {

        return (
            <div>
                <Header />
                <br />
                <Category />
                <br />
                <Product products={this.state.products} />
            </div>

        )
    }
}

export default Shop