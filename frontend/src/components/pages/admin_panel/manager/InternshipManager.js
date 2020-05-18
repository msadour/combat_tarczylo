import React, { Component } from "react";

import MenuManager from "../manager/MenuManager"

import InternshipCreateForm from "../layout/create/InternshipCreateForm"
import InternshipUpdateForm from "../layout/update/InternshipUpdateForm"


class InternshipManager extends Component {

    render() {
        return (

            <div>
                <MenuManager />
                <InternshipCreateForm />
                <InternshipUpdateForm />
            </div>
        )
    }

}

export default InternshipManager