import React, { Component } from "react";
import ReactDom from "react-dom";

const ProductsCategory = ({ categories }) => {
  return (
    <div>
        {categories.map((category) => (
            <div key={category.id}>
                <h1>{category.name}</h1>

                <table border="1">
                    <tbody>
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
            </div>
        ))}
    </div>
  )
};

export default ProductsCategory