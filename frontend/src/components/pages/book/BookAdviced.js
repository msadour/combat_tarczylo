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
              <table border="0" style={{width: "90%"}} className="page_content">
                <tbody>
                    <tr>
                        {this.state.books.map((book) => (
                            <th key={book.id}>
                                <div style={{backgroundColor: "#D8D8D8", width:"90%", marginLeft: "5%"}}>
                                    <br />
                                    <h2 className="text_jl">{book.name}</h2>
                                    <p className="text_presentation">Author : {book.author}</p>
                                    <p className="text_presentation">Kind of book :{book.category}</p>
                                    <p className="text_presentation">URL: {book.url}</p><br />
                                </div>
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