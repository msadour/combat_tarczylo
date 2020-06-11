import React, { Component } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Link } from "react-router-dom";

import MenuGuest from "./menus/MenuGuest"
import MenuMember from "./menus/MenuMember"
import MenuAdmin from "./menus/MenuAdmin"

class Menu extends Component {
    render() {

        if (localStorage.getItem('token')) {
            if (localStorage.getItem('is_admin') == 'true'){
                return <MenuAdmin />
            } else {
                return <MenuMember />
            }
        } else {
            return <MenuGuest />
        }
    }
}

export default Menu