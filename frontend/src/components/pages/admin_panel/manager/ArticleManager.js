import React, { Component } from "react";

import MenuManager from "../manager/MenuManager"

import ArticleCreateForm from "../layout/create/ArticleCreateForm"
import ArticleUpdateForm from "../layout/update/ArticleUpdateForm"


class ArticleManager extends Component {

    render() {
        return (

            <div>
                <MenuManager />

                <ArticleCreateForm />

                <ArticleUpdateForm />
            </div>
        )
    }

}

export default ArticleManager