import React, { Component } from "react";
import axios from 'axios';

import MenuManager from "./MenuManager"


class Manager extends Component {

    constructor(props) {
        super(props);

        this.state = {
            url: window.location.pathname,
            items: []
        }

        console.log(props)
    }

    componentDidMount() {

        this.props.history.listen((location, action) => {
          alert(location)
        });

        const api_url = '';
        switch(this.state.url){
            case "admin_panel_member":
                api_url = '/api_tct/member/'
            break;


            case "admin_panel_article":
                api_url = '/api_tct/article/'
            break;


            case "admin_panel_presentation":
                api_url = '/api_tct/presentation/'
            break;


            case "admin_panel_product":
                api_url = '/api_tct/product/'
            break;


            case "admin_panel_product_category":
                api_url = '/api_tct/category/'
            break;


            case "admin_panel_course":
                api_url = '/api_tct/course/'
            break;


            case "admin_panel_internship":
                api_url = '/api_tct/internship/'
            break;


            case "admin_panel_important_message":
                api_url = '/api_tct/important_message/'
            break;


            case "admin_panel_club":
                api_url = '/api_tct/club/'
            break;


            case "admin_panel_book":
                api_url = '/api_tct/book/'
            break;
        }

        alert(this.state.url)
    }



    render() {
        return(
            <div>


            </div>

        )
    }

}

export default Manager