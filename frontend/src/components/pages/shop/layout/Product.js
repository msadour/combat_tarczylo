import React from "react";


const Product = ({ products }) => {
    return (
        <div>
            {products.map((product) => (
                <div key={product.id}>
                    <h5 >{product.name}</h5>
                </div>

            ))}
        </div>
    )
};

export default Product
