import React, { Component } from "react";
import ReactDom from "react-dom";

const ProductsCategory = ({ categories }) => {
  return (
    <div>
        {categories.map((category) => (
            <div key={category.id}>

                <table border="0" className="page_content">
                    <tbody>
                        <tr><th colSpan={categories.length}> <h1 className="text-center text_jl" colSpan={category.products.length}>{category.name}</h1> </th></tr>
                        <tr>
                            {category.products.map((product) => (
                                <th key={product.id}>
                                    <img style={{width:"50%"}} src={product.picture} />
                                    <h2 className="text_jl">{product.name}</h2>
                                    <p className="text_jl"> price : {product.price} €</p>
                                    <p className="text_jl">Quantity available : {product.quantity_available}</p>
                                    <p className="text_jl">size: {product.size} </p>
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