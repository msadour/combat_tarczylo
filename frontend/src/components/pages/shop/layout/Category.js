import React from "react";

import Product from "./Product";

const Category = ({ categories }) => {
    return (
        <div>
            {categories.map((category) => (
                <div key={category.id}>
                    <h5 >{category.name}</h5>

                    {
                    JSON.parse(category.products.replace(/'/g,'"'))
                    }
                </div>

            ))}
        </div>
    )
};

export default Category