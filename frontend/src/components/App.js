import React, { Component, Fragment } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"

import Menu from "./layout/Menu";
import Footer from "./layout/Footer";
import Home from "./pages/home/Home";
import Authentication from "./pages/authentication/Authentication";

import Contact from "./pages/contact/Contact";
import CoursePage from "./pages/course/CoursePage";
import MemberPage from "./pages/member/MemberPage";
import MemberProfile from "./pages/member/MemberProfile";
import Presentation from "./pages/presentation/Presentation";
import Shop from "./pages/shop/Shop";
import TrainingPage from "./pages/training/TrainingPage";
import LookingFor from "./pages/looking_for/LookingFor";

import './style.css';

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
                                <Route exact path='/authentication' component={Authentication} />
                                <Route exact path='/contact' component={Contact} />
                                <Route exact path='/course' component={CoursePage} />
                                <Route exact path='/member' component={MemberPage} />
                                <Route exact path='/member_profile' component={MemberProfile} />
                                <Route exact path='/presentation' component={Presentation} />
                                <Route exact path='/shop' component={Shop} />
                                <Route exact path='/looking_for' component={LookingFor} />
                                <Route exact path='/training' component={TrainingPage} />
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