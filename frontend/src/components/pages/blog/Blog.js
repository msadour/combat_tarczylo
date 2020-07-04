import React, { Component } from "react";
import ReactDom from "react-dom";

class Blog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            articles: []
        }
    }

    componentDidMount(){
        fetch('/api_tct/article/', {
            method: "GET",
            headers: { 'Authorization': 'Token ' + localStorage.getItem('token') },
        })
        .then(response => response.json())
        .then((data) => {
            this.setState({articles: data});
        })
        .catch(err => {
            alert('error');
        });
    }

    render() {
        return (
            <div style={{marginLeft: "7%"}}>
              <br />
              { this.state.articles.length == 0 ? (
                  <table border="0" style={{width: "90%"}} className="page_content">
                    <tbody>
                        <tr>
                            <th>
                                 <div style={{backgroundColor: "#D8D8D8", width:"90%"}}>
                                    <br />
                                    <h2 className="text_jl">No article(s) available</h2>
                                    <br />
                                </div>
                            </th>
                        </tr>
                    </tbody>
                  </table>
              ) : (
                <section>
                  <table border="0" style={{width: "90%"}} className="page_content">
                    <tbody>
                        {this.state.articles.map((article) => (
                            <tr key={article.id}>
                                <th>
                                    <div style={{backgroundColor: "#D8D8D8", width:"90%", marginTop: "3%"}}>
                                        <br />
                                        <h2 className="text_jl">{article.title}</h2>
                                        <p className="text_presentation">Category : {article.category}</p>
                                        <p className="text_presentation">{article.content}</p>
                                        <br />
                                    </div>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                  </table>
                </section>
              )}
            </div>
        )
    }
}

export default Blog