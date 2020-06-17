import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import FormField from "../Form";
import header from "../../../../header";

class ProductUpdateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: []
        }
    }

    componentDidMount(){
        console.log(localStorage.getItem('token'))
        axios.get('/api_tct/product/', { headers: {
        'Authorization': 'Token ' + localStorage.getItem('token')
    }, })
        .then(res => {
            this.setState({products: res.data});
        })
        .catch(err => {
            console.log(err)
        });
    }

    handleRemove(id) {
        event.preventDefault();
        axios.delete('/api_tct/product/' + id + '/', header)
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
                    <FormField type_input="text" model="product" id={product.id} field="name" label="Name" value={product.name} />
                    <FormField type_input="price" model="product" id={product.id} field="price" label="Price" value={product.price} />
                    <FormField type_input="number" model="product" id={product.id} field="quantity_available" label="Quantity_available" value={product.quantity_available} />
                    <FormField type_input="text" model="product" id={product.id} field="size" label="Size" value={product.size} />
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