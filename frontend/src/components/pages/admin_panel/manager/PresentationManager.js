import React, { Component } from "react";

import MenuManager from "../manager/MenuManager"
import PresentationUpdateForm from "../layout/update/PresentationUpdateForm"


class PresentationManager extends Component {

    render() {
        return (

            <div>
                <MenuManager />
                <PresentationUpdateForm />
            </div>
        )
    }
}

export default PresentationManager