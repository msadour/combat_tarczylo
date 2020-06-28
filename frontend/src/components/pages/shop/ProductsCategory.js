import React, { Component } from "react";
import ReactDom from "react-dom";

const ProductsCategory = ({ categories }) => {
  return (
    <div>
        {categories.map((category) => (
            <div key={category.id}>

                <table border="1" style={{width: '90%'}}>
                    <tbody>
                        <tr> <h1 colSpan={category.products.length}>{category.name}</h1> </tr>
                        <tr>
                            {category.products.map((product) => (
                                <th key={product.id}>
                                    <h2>{product.name}</h2>
                                    price : {product.price} €<br />
                                    Quantity available : {product.quantity_available} <br />
                                    size: {product.size} <br /><br />
                                </th>
                            ))}
                        </tr>
                    </tbody>
                </table>
                <br />
            </div>
        ))}
    </div>
  )
};

export default ProductsCategory