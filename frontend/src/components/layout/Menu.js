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
                    <div>
                        <MenuMemberTop />
                        <br /><br />
                        <MenuAdmin />
                    </div>
                )
            } else {
                return (
                    <div>
                        <MenuMemberTop />
                        <br /><br />
                        <MenuMember />
                    </div>
                )
                            }
        } else {
            return (
                <div>
                    <MenuGuestTop />
                    <br /><br />
                    <MenuGuest />
                </div>

            )
        }
    }
}

export default Menu