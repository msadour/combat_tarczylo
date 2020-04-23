import React, { Component } from "react";
import ReactDom from "react-dom";

import Technical from "./layout/Technical";
import Tct from "./layout/Tct";
import Darius from "./layout/Darius";

class Presentation extends Component {
    render() {
        return (
            <div>
                <Tct />
                <br />
                <Darius />
                <br />
                <Technical />
            </div>
        )
    }
}

export default Presentation