import React, { Component } from "react";

import MenuManager from "../manager/MenuManager"

import BookCreateForm from "../layout/create/BookCreateForm"
import BookUpdateForm from "../layout/update/BookUpdateForm"


class BookManager extends Component {

    render() {
        return (
            <div>
                <MenuManager />

                <BookCreateForm />

                <BookUpdateForm />
            </div>

        )
    }

}

export default BookManager