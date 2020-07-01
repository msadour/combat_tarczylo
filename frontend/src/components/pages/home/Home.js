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
        var main_menu = document.getElementsByClassName("main_menu")
        main_menu[0].style.display = 'block';
    }

    render() {
        return (
            <div>
                <br />
                <table className="page_content">
                    <tbody>
                        <tr style={{width: "50%"}}>
                            <th><img style={{width: "100%"}} src="../../../../../media/image_home.png" /></th>
                        </tr>
                    </tbody>
                </table>
            </div>

        )
    }
}

export default Home

//<p>{this.state.message != null? this.state.message.content : "" }</p>