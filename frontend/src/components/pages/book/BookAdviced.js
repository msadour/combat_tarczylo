import React, { Component } from "react";
import ReactDom from "react-dom";

class BookAdviced extends Component {

    constructor(props) {
        super(props);

        this.state = {
            books: []
        }
    }

    componentDidMount(){
        fetch('/api_tct/book/')
        .then(response => response.json())
        .then((data) => {
            this.setState({books: data});
        })
        .catch(err => {
        console.log(res);
            alert('error');

        });
    }

    render() {
        return (
            <div>
              <br />
              <table border="1" style={{width: "90%"}}>
                <tbody>
                    <tr>
                        {this.state.books.map((book) => (
                            <th key={book.id}>
                                <h2 className="text_jl">{book.name}</h2>
                                <p className="text_jl">Author : {book.author}</p><br />
                                <p className="text_jl">Kind of book :{book.category}</p><br />
                                <p className="text_jl">URL: {book.url}</p><br /><br />
                            </th>
                        ))}
                    </tr>
                </tbody>
              </table>
            </div>
        )
    }
}

export default BookAdviced