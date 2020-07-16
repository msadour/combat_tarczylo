import React, { Component } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Link, withRouter } from "react-router-dom";

class VerticalMenu extends Component {

    constructor(props){
        super(props);
        this.logout.bind(this);
    }

    logout = e => {
        e.preventDefault();
        fetch('/api_tct/logout/', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })
        .then(res => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('member_id');
            this.props.history.push("/");
            window.location.reload();
        })
        .catch(err => {
            alert(err);
            console.log(err)
        });
    }

    render() {
        return (
            <div id="vertical_menu">
                <Link to='/'>
                    <img style={{width: "70%", marginTop: "20%", marginLeft: "15%"}} src="../../../../../media/logo.png" />
                </Link>
                <hr id="hr_vertical_menu_icon" />

                { localStorage.getItem('username') == "dariustarczylo@gmail.com" ? (
                    <div className="dropdown">
                      <img src="../../../../../media/icon_admin_menu.png" className="dropbtn" />
                      <div className="dropdown-content">
                        <ul >
                              <li>
                                  <Link
                                    to='admin_panel_member'
                                    className="text_jl_vertical_menu_vertical_menu"
                                  >
                                    <p className="text_jl_vertical_menu" >Member</p>
                                </Link>
                              </li>

                              <li>
                                  <Link
                                      to='admin_panel_article'
                                     >
                                    <p className="text_jl_vertical_menu" >Article</p>
                                </Link>
                              </li>

                                <li>
                                  <Link to='admin_panel_presentation'>
                                    <p className="text_jl_vertical_menu">Presentation</p>
                                </Link>
                              </li>

                            <li>
                                  <Link to='admin_panel_product'>
                                    <p className="text_jl_vertical_menu">Product</p>
                                </Link>
                              </li>

                                <li>
                                  <Link to='admin_panel_product_category'>
                                    <p className="text_jl_vertical_menu">Product category</p>
                                </Link>
                              </li>

                                <li>
                                  <Link to='admin_panel_course'>
                                    <p className="text_jl_vertical_menu">Course</p>
                                </Link>
                              </li>

                                <li>
                                  <Link to='admin_panel_internship'>
                                    <p className="text_jl_vertical_menu">Internship</p>
                                </Link>
                              </li>

                                <li>
                                  <Link to='admin_panel_important_message'>
                                    <p className="text_jl_vertical_menu">Message</p>
                                </Link>
                              </li>

                            <li>
                                  <Link to='admin_panel_club'>
                                    <p className="text_jl_vertical_menu">Club information</p>
                                </Link>
                              </li>

                                <li>
                                  <Link to='admin_panel_book'>
                                    <p className="text_jl_vertical_menu">Book</p>
                                </Link>
                              </li>

                        </ul>
                      </div>
                    </div>
                ) : (
                    <div></div>
                )}

                <div id="items_menu_vertical">
                         <Link to='/contact'>
                            <img style={{width: "100%"}} src="../../../../../media/email.png" />
                            <hr id="hr_vertical_menu" />
                        </Link>



                         <Link to='/looking_for'>
                            <img style={{width: "50%", marginLeft: "25%"}} src="../../../../../media/search_icon.png" />
                            <hr id="hr_vertical_menu" />
                        </Link>

                        { localStorage.getItem('token') == undefined ? (

                             <Link to='/authentication'>
                                <img style={{width: "90%"}} src="../../../../../media/icon_login.png" />
                                <hr id="hr_vertical_menu" />
                            </Link>

                            ) : (
                             <Link to='/'>
                                <img style={{width: "60%",  marginLeft: "15%"}} onClick={this.logout} src="../../../../../media/icon_logout.png" />
                                <hr id="hr_vertical_menu" />
                            </Link>
                        )}
                </div>
                <hr id="hr_vertical_menu_bottom" />
            </div>
        )
    }
}

export default withRouter(VerticalMenu)