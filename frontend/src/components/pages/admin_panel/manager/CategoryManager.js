import React, { Component } from "react";

import MenuManager from "../manager/MenuManager"

import CategoryCreateForm from "../layout/create/CategoryCreateForm"
import CategoryUpdateForm from "../layout/update/CategoryUpdateForm"


class CategoryManager extends Component {

    render() {
        return (
            <div>
                <MenuManager />
                <CategoryCreateForm />

                <CategoryUpdateForm />
            </div>

        )
    }

}

export default CategoryManager