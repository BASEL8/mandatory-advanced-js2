import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import AddMovie from "./components/AddMovie";
import EditMovie from "./components/EditMovie";
import MovieInfo from "./components/MovieInfo";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/Nav";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="h-100">
          <NavBar />
          <div className="container d-flex justify-content-center align-items-center h-100">
            <Route path="/Home/edit/:id" exact component={EditMovie} />
            <Route path="/Home/:id" exact component={MovieInfo} />
            <Route path="/Home" exact component={HomePage} />
            <Route path="/addMovie" exact component={AddMovie} />
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
