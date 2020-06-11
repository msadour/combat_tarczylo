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
            console.log(data);
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
                <Tct text={this.state.presentation.tct} />
                <br />
                <Darius text={this.state.presentation.darius} />
                <br />
                <Technical text={this.state.presentation.technical} />
            </div>
        )
    }
}

export default Presentation