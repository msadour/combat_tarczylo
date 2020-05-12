import React, { Component } from "react";

import MenuManager from "../manager/MenuManager"

import ArticleCreateForm from "../layout/create/ArticleCreateForm"


class ArticleManager extends Component {

    render() {
        return (

            <div>
                <MenuManager />

                <ArticleCreateForm />
            </div>
        )
    }

}

export default ArticleManager