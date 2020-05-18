import React, { Component } from "react";

import MenuManager from "../manager/MenuManager"
import ClubUpdateForm from "../layout/update/ClubUpdateForm"


class ClubManager extends Component {

    render() {
        return (

            <div>
                <MenuManager />
                <ClubUpdateForm />
            </div>
        )
    }

}

export default ClubManager