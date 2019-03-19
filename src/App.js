import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
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
      <div>
        <NavBar />
        <div className="container d-flex justify-content-center align-items-center h-100">
          <Switch>
            <Route path="/Home/edit/:id" exact component={EditMovie} />
            <Route path="/Home/:id" exact component={MovieInfo} />
            <Route
              path="/Home"
              exact
              component={(props) => (
                <HomePage setInfo={this.setInfo} {...props} />
              )}
            />
            <Route path="/addMovie" exact component={AddMovie} />
            <Route path="/not-found" render={() => <h3>Not Found</h3>} />
            <Redirect from="/" to="/home" />
            <Redirect from="*" to="/not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;
