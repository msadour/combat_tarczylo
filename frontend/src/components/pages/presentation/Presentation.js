import React, { Component } from "react";
import ReactDom from "react-dom";

import Technical from "./layout/Technical";
import Tct from "./layout/Tct";
import Darius from "./layout/Darius";
import Band from "./layout/Band";

class Presentation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            presentation: {}
        }
    }


    componentDidMount(){
        fetch('/api_tct/presentation/')
        .then(response => response.json())
        .then((data) => {
            this.setState({presentation: data});
        })
        .catch(err => {
            alert('error');
        });
        var main_menu = document.getElementsByClassName("main_menu")
        main_menu[0].style.display = 'none';
    }

    render() {
        return (
            <div>
                <Band />
                <Tct name={this.state.presentation.name_club} text={this.state.presentation.tct} />
                <Darius text={this.state.presentation.darius} />
                <Technical text={this.state.presentation.technical} />
            </div>
        )
    }
}

export default Presentation