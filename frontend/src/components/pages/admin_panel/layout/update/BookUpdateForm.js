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
        fetch('/api_tct/book/', {
            method: "GET",
            headers: { 'Authorization': 'Token ' + localStorage.getItem('token') },
        })
        .then(response => response.json())
        .then((data) => {
            this.setState({books: data});
        })
        .catch(err => {
            console.log(err);
        });
    }

    handleRemove(id) {
        event.preventDefault();
        axios.delete('/api_tct/book/' + id + '/' , header)
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
                <div key={book.id} className="col-md-6 m-auto">
                    <div className="card card-body mt-5">
                        <h2 className="text-center">{book.name}</h2>
                        <FormField type_input="text" model="book" id={book.id} field="name" label="Name" value={book.name} />
                        <FormField type_input="text" model="book" id={book.id} field="author" label="Author" value={book.author} />
                        <FormField type_input="text" model="book" id={book.id} field="category" label="Category" value={book.category} />
                        <FormField type_input="text" model="book" id={book.id} field="url" label="URL" value={book.url} />
                        <button style={{width:"10%"}} type="button" onClick={() => this.handleRemove(book.id)}>Remove</button>
                    </div>
                </div>

            )

        })

        return (
            <div>
                {list_book_component}
                <br /><br />
            </div>
        )
    }
}

export default BookUpdateForm