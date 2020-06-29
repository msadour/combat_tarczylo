import React, { Component } from "react";
import ReactDom from "react-dom";

class BookAdviced extends Component {

    constructor(props) {
        super(props);

        this.state = {
            books: []
        }

        this.openLink.bind(this)
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

    openLink(link) {
        var win = window.open(link, '_blank');
        win.focus();
      //window.open(link);
    }

    render() {
        return (
            <div>
              <center><h1>Book adviced</h1></center>
              <table border="1" style={{width: "90%"}}>
                <tbody>
                    <tr>
                        {this.state.books.map((book) => (
                            <th key={book.id}>
                                <h2>{book.name}</h2>
                                Author : {book.author} <br />
                                Kind of book :{book.category} <br />
                                URL: {book.url} <br /><br />
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