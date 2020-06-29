import React, { Component } from "react";
import ReactDom from "react-dom";

import Technical from "./layout/Technical";
import Tct from "./layout/Tct";
import Darius from "./layout/Darius";

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
        console.log(res);
            alert('error');

        });
    }

    render() {
        return (
            <div>
                <Tct name={this.state.presentation.name_club} text={this.state.presentation.tct} />
                <Darius text={this.state.presentation.darius} />
                <Technical text={this.state.presentation.technical} /> <br /> <br />
            </div>
        )
    }
}

export default Presentation