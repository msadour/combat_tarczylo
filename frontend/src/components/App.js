import React, { Component, Fragment } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import axios from "axios";

import Menu from "./layout/Menu";
import Footer from "./layout/Footer";
import Home from "./pages/home/Home";
//import Authentication from "./pages/authentication/Authentication";

import Login from "./pages/authentication/Login";
import Subscription from "./pages/authentication/Subscription";

import Contact from "./pages/contact/Contact";
import CoursePage from "./pages/course/CoursePage";
import MemberPage from "./pages/member/MemberPage";
import MemberProfile from "./pages/member/MemberProfile";
import Presentation from "./pages/presentation/Presentation";
import Shop from "./pages/shop/Shop";
import TrainingPage from "./pages/training/TrainingPage";
import LookingFor from "./pages/looking_for/LookingFor";
import AdminPanel from "./pages/admin_panel/AdminPanel";

import ArticleManager from "./pages/admin_panel/manager/ArticleManager";
import BookManager from "./pages/admin_panel/manager/BookManager";
import CategoryManager from "./pages/admin_panel/manager/CategoryManager";
import ClubManager from "./pages/admin_panel/manager/ClubManager";
import CourseManager from "./pages/admin_panel/manager/CourseManager";
import InternshipManager from "./pages/admin_panel/manager/InternshipManager";
import MemberManager from "./pages/admin_panel/manager/MemberManager";
import MessageManager from "./pages/admin_panel/manager/MessageManager";
import PresentationManager from "./pages/admin_panel/manager/PresentationManager";
import ProductManager from "./pages/admin_panel/manager/ProductManager";

import './style.css';

axios.defaults.headers.common = {
    'Authorization': 'Token ' + localStorage.getItem('token')
};

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Menu />
                    <Fragment>
                        <div>
                            <Switch>
                                <Route exact path='/' component={Home} />
                                <Route exact path='/authentication' component={Login} />
                                <Route exact path='/subscription' component={Subscription} />
                                <Route exact path='/contact' component={Contact} />
                                <Route exact path='/course' component={CoursePage} />
                                <Route exact path='/member' component={MemberPage} />
                                <Route exact path='/member_profile' component={MemberProfile} />
                                <Route exact path='/presentation' component={Presentation} />
                                <Route exact path='/shop' component={Shop} />
                                <Route exact path='/looking_for' component={LookingFor} />
                                <Route exact path='/training' component={TrainingPage} />

                                <Route exact path='/admin_panel_member' component={MemberManager} />
                                <Route exact path='/admin_panel_article' component={ArticleManager} />
                                <Route exact path='/admin_panel_presentation' component={PresentationManager} />
                                <Route exact path='/admin_panel_product' component={ProductManager} />
                                <Route exact path='/admin_panel_product_category' component={CategoryManager} />
                                <Route exact path='/admin_panel_course' component={CourseManager} />
                                <Route exact path='/admin_panel_internship' component={InternshipManager}  />
                                <Route exact path='/admin_panel_important_message' component={MessageManager} />
                                <Route exact path='/admin_panel_club' component={ClubManager} />
                                <Route exact path='/admin_panel_book' component={BookManager} />
                            </Switch>
                        </div>
                    </Fragment>
                    <Footer />
                </Router>
            </div>
        )
    }
}

ReactDom.render(<App />, document.getElementById('app'))