import React, { Component } from "react";

import MenuManager from "../manager/MenuManager"

import CategoryCreateForm from "../layout/create/CategoryCreateForm"


class CategoryManager extends Component {

    render() {
        return (
            <div>
                <MenuManager />
                <CategoryCreateForm />
            </div>

        )
    }

}

export default CategoryManager