import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import FormField from "../Form";

class BookUpdateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            books: []
        }
    }

    componentDidMount(){
        axios.get('/api_tct/book/')
        .then(res => {
            this.setState({books: res.data});
        })
        .catch(err => {
            console.log(err)
        });
    }

    handleRemove(id) {
        event.preventDefault();
        axios.delete('/api_tct/book/' + id + '/')
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        });
        return false
    }


    render() {
        var list_book_component = []

        this.state.books.forEach( book => {

            list_book_component.push(
                <div key={book.id}>
                    <h2>{book.name}</h2>
                    <FormField type_input="text" model="book" id={book.id} field="name" label="name" value={book.name} />
                    <FormField type_input="text" model="book" id={book.id} field="author" label="author" value={book.author} />
                    <FormField type_input="text" model="book" id={book.id} field="category" label="category" value={book.category} />
                    <FormField type_input="text" model="book" id={book.id} field="url" label="url" value={book.url} />
                    <button type="button" onClick={() => this.handleRemove(book.id)}>Remove</button>
                </div>

            )

        })

        return (
            <div>
                {list_book_component}

            </div>
        )
    }
}

export default BookUpdateForm