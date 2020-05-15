import React, { Component } from "react";

import MenuManager from "../manager/MenuManager"

import ProductCreateForm from "../layout/create/ProductCreateForm"
import ProductUpdateForm from "../layout/update/ProductUpdateForm"


class ProductManager extends Component {

    render() {
        return (

            <div>
                <MenuManager />
                <ProductCreateForm />
                <ProductUpdateForm />
            </div>
        )
    }

}

export default ProductManager