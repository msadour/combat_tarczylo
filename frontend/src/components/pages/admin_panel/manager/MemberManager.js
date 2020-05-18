import React, { Component } from "react";

import MenuManager from "../manager/MenuManager"
import MemberUpdateForm from "../layout/update/MemberUpdateForm"


class MemberManager extends Component {

    render() {
        return (
            <div>
                <MenuManager />
                <MemberUpdateForm />
            </div>

        )
    }

}

export default MemberManager