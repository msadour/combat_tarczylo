import React, { Component } from "react";

import MenuManager from "../manager/MenuManager"

import MessageCreateForm from "../layout/create/MessageCreateForm"
import MessageUpdateForm from "../layout/update/MessageUpdateForm"


class MessageManager extends Component {

    render() {
        return (

            <div>
                <MenuManager />
                <MessageUpdateForm />
            </div>
        )
    }

}

export default MessageManager