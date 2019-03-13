import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
class HomePage extends Component {
  state = {
    movies: [],
    filter: ""
  };
  componentDidMount() {
    fetch(
      "http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies"
    )
      .then((response) => response.json())
      .then((movies) => this.setState({ movies }));
  }
  handleDelete = (id) => {
    axios
      .delete(
        "http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/" +
          id
      )
      .then((response) => {
        const newState = [...this.state.movies];
        this.setState({
          movies: newState.filter((movie) => id !== movie.id)
        });
      });
  };
  render() {
    const { movies } = this.state;
    const filteredList =
      this.state.filter === ""
        ? movies
        : movies.filter((movie) =>
            movie.title.toLowerCase().includes(this.state.filter.toLowerCase())
          );
    return (
      <div className="flex-grow-1">
        <Helmet>
          <title>Home</title>
        </Helmet>
        <div className="w-100">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="form-inline  mb-2 d-flex w-100"
          >
            <input
              className="form-control flex-grow-1"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => this.setState({ filter: e.target.value })}
            />
          </form>
        </div>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th scope="col">Title</th>
              <th scope="col">Director</th>
              <th scope="col">Rating</th>
              <th scope="col" />
              <th scope="col" />
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {filteredList.map((movie, index) => (
              <tr key={index}>
                <th scope="row">{index}</th>
                <td>{movie.title}</td>
                <td>{movie.director}</td>
                <td>{movie.rating}</td>
                <td>
                  <Link to={`${this.props.match.url}/${movie.id}`}>
                    <button type="button" className="btn btn-sm btn-success">
                      info
                    </button>
                  </Link>
                </td>
                <td>
                  <Link to={`${this.props.match.url}/edit/${movie.id}`}>
                    <button type="button" className="btn btn-sm btn-info">
                      Edit
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => this.handleDelete(movie.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default HomePage;
