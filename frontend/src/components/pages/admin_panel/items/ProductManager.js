import React, { Component } from "react";

import MenuManager from "../manager/MenuManager"

import ProductCreateForm from "../layout/create/ProductCreateForm"


class ProductManager extends Component {

    render() {
        return (

            <div>
                <MenuManager />
                <ProductCreateForm />
            </div>
        )
    }

}

export default ProductManager