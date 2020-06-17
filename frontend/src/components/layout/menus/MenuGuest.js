import React, { Component } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Link } from "react-router-dom";

class MenuGuest extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-expand-sm navbar-light bg-light">
              <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                      <li className="nav-item active">
                          <Link to='/' className="nav-link">
                            <p className="nav-link">Home</p>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to='/presentation' className="nav-link">
                            <p className="nav-link">Presentation</p>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to='/training' className="nav-link">
                            <p className="nav-link">Trainings</p>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to='/shop' className="nav-link">
                            <p className="nav-link">Store</p>
                        </Link>
                      </li>

                </ul>
              </div>
            </nav>
        )
    }
}

export default MenuGuest