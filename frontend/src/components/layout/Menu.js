import React, { Component } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Link } from "react-router-dom";

import MenuGuest from "./menus/MenuGuest"
import MenuMember from "./menus/MenuMember"
import MenuGuestTop from "./menus/MenuGuestTop"
import MenuMemberTop from "./menus/MenuMemberTop"
import MenuAdmin from "./menus/MenuAdmin"

class Menu extends Component {
    render() {

        if (localStorage.getItem('token')) {
            if (localStorage.getItem('is_admin') == 'true'){
                return (
                    <div id="header_menu" >
                        <MenuMemberTop />
                        <br /><br /><br /><br />
                        <MenuAdmin />
                        <hr id="hr_menu" />
                        <br /><br /><br />
                    </div>
                )
            } else {
                return (
                    <div id="header_menu">
                        <MenuMemberTop />
                        <br /><br /><br /><br />
                        <MenuMember />
                        <hr id="hr_menu" />
                        <br /><br /><br />
                    </div>
                )
                            }
        } else {
            return (
                <div id="header_menu">
                    <MenuGuestTop />
                    <br /><br /><br /><br />
                    <MenuGuest />
                    <hr id="hr_menu" />
                    <br /><br /><br />
                </div>

            )
        }
    }
}

export default Menu