import React, { Component } from "react";
import { Link } from "react-router-dom";
class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav mr-auto justify-content-between align-items-center w-100">
          <li className="nav-item active">
            <Link to="/Home">
              <p className="navbar-brand">Film Database</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Home">
              <p className="navbar-brand">Home</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/addMovie/">
              <button type="button" className="btn btn-sm btn-info">
                Add Movie
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
