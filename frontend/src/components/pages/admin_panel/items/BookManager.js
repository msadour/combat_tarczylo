import React, { Component } from "react";

import MenuManager from "../manager/MenuManager"

import BookCreateForm from "../layout/create/BookCreateForm"


class BookManager extends Component {

    render() {
        return (
            <div>
                <MenuManager />
                <BookCreateForm />
            </div>

        )
    }

}

export default BookManager