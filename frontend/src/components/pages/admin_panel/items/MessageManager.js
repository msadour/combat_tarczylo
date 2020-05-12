import React, { Component } from "react";

import MenuManager from "../manager/MenuManager"

import MessageCreateForm from "../layout/create/MessageCreateForm"


class MessageManager extends Component {

    render() {
        return (

            <div>
                <MenuManager />
                <MessageCreateForm />
            </div>
        )
    }

}

export default MessageManager