import React, { Component } from "react";

import MenuManager from "../manager/MenuManager"

import InternshipCreateForm from "../layout/create/InternshipCreateForm"


class InternshipManager extends Component {

    render() {
        return (

            <div>
                <MenuManager />
                <InternshipCreateForm />
            </div>
        )
    }

}

export default InternshipManager