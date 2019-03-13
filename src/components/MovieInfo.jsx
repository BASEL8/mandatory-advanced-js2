import React, { Component } from "react";
import { Link } from "react-router-dom";
class MovieInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id
    };
  }

  componentWillMount() {
    fetch(
      "http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/" +
        this.state.id
    )
      .then((response) => response.json())
      .then((movie) => this.setState({ movie }));
  }
  render() {
    const { movie } = this.state;
    if (movie === undefined) return <div>Wait...</div>;
    return (
      <main
        role="main"
        className="d-flex w-100 h-100 flex-grow-1 p-3 mx-auto justify-content-center align-items-center flex-column"
      >
        <h1 className="cover-heading">{movie.title}</h1>
        <h3 className="cover-heading"> {movie.director}</h3>
        <p className="lead">{movie.description}</p>
        <p className="lead">
          <span className="btn btn-lg btn-secondary">{movie.rating}</span>
        </p>
        <Link to={"/Home/edit/" + movie.id}>
          <button type="button" className="btn btn-sm btn-info">
            Edit
          </button>
        </Link>
      </main>
    );
  }
}
export default MovieInfo;
