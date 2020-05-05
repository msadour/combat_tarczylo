import React, { Component } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Link } from "react-router-dom";

import MenuGuest from "./menus/MenuGuest"
import MenuMember from "./menus/MenuMember"

class Menu extends Component {
    render() {

        if (localStorage.getItem('jwt')) {
            return <MenuMember />
        } else {
            return <MenuGuest />
        }
    }
}

export default Menu