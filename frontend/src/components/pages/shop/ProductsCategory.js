import React, { Component } from "react";
import ReactDom from "react-dom";

const ProductsCategory = ({ categories }) => {
  return (
    <div>
        {categories.map((category) => (
            <div key={category.id}>

                <table border="0" className="page_content" style={{backgroundColor: "white"}}>
                    <tbody>
                        <tr>
                            <th colSpan={categories.length}>
                                <h2 className="text-center text_jl" colSpan={category.products.length}>{category.name}</h2>
                                <hr className="hr_presentation" style={{width: "3%"}}/>
                            </th>
                        </tr>
                        <tr>
                            {category.products.map((product) => (
                                <th key={product.id}>
                                    <div style={{backgroundColor: "#D8D8D8", width:"90%", marginLeft: "5%"}}>
                                        <br />
                                        <img style={{width:"25%"}} src={product.picture} />
                                        <h2 className="text_jl">{product.name}</h2>
                                        <p className="text_presentation"> price : {product.price} €</p>
                                        <p className="text_presentation">Quantity available : {product.quantity_available}</p>
                                        <p className="text_presentation">size: {product.size} </p>

                                    </div>
                                </th>
                            ))}
                        </tr>
                    <tr>
                        <th><br /></th>
                    </tr>
                    </tbody>
                </table>
            </div>
        ))}
    </div>
  )
};

export default ProductsCategory