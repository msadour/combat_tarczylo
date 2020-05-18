import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import FormField from "../Form";

class ProductUpdateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: []
        }
    }

    componentDidMount(){
        axios.get('/api_tct/product/')
        .then(res => {
            this.setState({products: res.data});
        })
        .catch(err => {
            console.log(err)
        });
    }

    handleRemove(id) {
        event.preventDefault();
        axios.delete('/api_tct/product/' + id + '/')
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        });
        return false
    }


    render() {

        var list_product_component = []

        this.state.products.forEach( product => {

            list_product_component.push(
                <div key={product.id}>
                    <h2>{product.name}</h2>
                    <FormField type_input="text" model="product" id={product.id} field="name" label="name" value={product.name} />
                    <FormField type_input="price" model="product" id={product.id} field="price" label="price" value={product.price} />
                    <FormField type_input="number" model="product" id={product.id} field="quantity_available" label="quantity_available" value={product.quantity_available} />
                    <FormField type_input="text" model="product" id={product.id} field="size" label="size" value={product.size} />
                    <button type="button" onClick={() => this.handleRemove(product.id)}>Remove</button>
                </div>
            )
        })

        return (
            <div>
                {list_product_component}
            </div>
        )
    }
}

export default ProductUpdateForm