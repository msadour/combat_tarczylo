import React, { Component } from "react";
import ReactDom from "react-dom";

const ProductsCategory = ({ categories }) => {
  return (
    <div style={{backgroundColor: "white"}}>
        <br />
        {categories.map((category) => (
            category.products.length == 0 ? (
                <div key={category.id} style={{"padding": "2%"}}>
                    <table border="0" className="page_content">
                        <tbody>
                            <tr>
                                <th colSpan={categories.length}>
                                    <h2 className="text-center text_jl" >{category.name}</h2>
                                    <hr className="hr_presentation" style={{width: "3%"}}/>
                                </th>
                            </tr>
                            <tr>
                                <th>No {category.name} available</th>
                            </tr>

                            <tr>
                                <th><br /></th>
                            </tr>

                        </tbody>
                    </table>
                </div>
            ) : (
                <div key={category.id}>

                    <table border="0" className="page_content" style={{backgroundColor: "white"}}>
                        <tbody>
                            <tr>
                                <th colSpan={categories.length}>
                                    <h2 className="text-center text_jl" colSpan={category.products.length}>{category.name}</h2>
                                    <hr className="hr_presentation" style={{width: "3%"}}/>
                                    <br />
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
                        </tbody>
                    </table>
                </div>
            )
        ))}
        <br /><br /><br /><br />
    </div>
  )
};

export default ProductsCategory