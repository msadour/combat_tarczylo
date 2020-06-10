import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import Header from "./layout/Header";
import Category from "./layout/Category";
import ProductsCategory from "./ProductsCategory";


import header from "../../header";

class Shop extends Component {

    constructor() {
        super()
        this.state = {
            categories: []
        }
    }

    componentDidMount() {

        fetch('/api_tct/category/')
        .then(response => response.json())
        .then((data) => {
            this.setState({ categories: data })
        })
    }

    build_list_products(category){

        var list_product_component = []

        var products = category.products
        products.forEach( product => {
            list_product_component.push(
                <div key={product.id}>
                    <h2>{product.name}</h2>
                </div>
            )
        })

        return list_product_component
    }

    render() {

        var list_category_component = []

        this.state.categories.forEach( category => {
            list_category_component.push(
                <div key={category.id}>
                    <h5 >{category.name}</h5>
                    {this.build_list_products(category)}
                </div>
            )
        })

        return (
            <div>
                <h1>Store (Available only in club)</h1>
                <br />
                <ProductsCategory categories={this.state.categories} />

            </div>

        )
    }
}

export default Shop