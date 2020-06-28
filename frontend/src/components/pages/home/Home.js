import React, { Component } from "react";
import ReactDom from "react-dom";

class Home extends Component {

    constructor(){
        super();
        this.state = {
            message: null
        }
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {

            fetch('/api_tct/important_message/', {
                method: "GET",
                headers: { 'Authorization': 'Token ' + localStorage.getItem('token') },
            })
            .then(response => response.json())
            .then((data) => {
                if(data.is_active == true){
                    this.setState({ message: data })
                }
            })
        }
    }

    render() {
        return (
            <div>
                <br />
                <center><h1>home page</h1></center>
                <table>

                    <tr>
                        <th><p>{this.state.message != null? this.state.message.content : "" }</p></th>
                    </tr>

                </table>
            </div>

        )
    }
}

export default Home