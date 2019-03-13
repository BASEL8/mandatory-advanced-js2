import React, { Component } from "react";
import { Helmet } from "react-helmet";
class EditMovie extends Component {
  state = {
    error: false,
    title: "",
    director: "",
    description: "",
    rating: 0
  };
  handleAddMovie = (e) => {
    e.preventDefault();
    let movieInfo = {};
    movieInfo.title = this.state.title;
    movieInfo.description = this.state.description;
    movieInfo.director = this.state.director;
    movieInfo.rating = this.state.rating;
    fetch(
      "http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/" +
        this.props.match.params.id,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(movieInfo)
      }
    )
      .then((response) => {
        if (response.ok) {
          this.props.history.push("/Home");
        } else {
          this.setState({
            error: true
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <div className="flex-grow-1">
        <Helmet>
          <title>Edit Film</title>
        </Helmet>
        <h4>Edit Film</h4>
        <form onSubmit={this.handleAddMovie}>
          <div className="form-group">
            <label htmlFor="movieTitleEdit">New Title</label>
            <input
              onChange={(e) => this.setState({ title: e.target.value })}
              type="text"
              className="form-control"
              id="movieTitleEdit"
              placeholder="title"
              style={{
                borderColor:
                  this.state.title !== "" && this.state.title.length < 40
                    ? "green"
                    : "red"
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="movieDirectorEdit">New Director</label>
            <input
              onChange={(e) => this.setState({ director: e.target.value })}
              type="text"
              className="form-control"
              id="movieDirectorEdit"
              placeholder="Director"
              style={{
                borderColor:
                  this.state.director !== "" && this.state.director.length < 40
                    ? "green"
                    : "red"
              }}
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="movieRatingEdit"
              style={{
                color:
                  this.state.rating >= 0 && this.state.rating <= 5
                    ? "green"
                    : "red"
              }}
            >
              New Rating
            </label>
            <input
              onChange={(e) => this.setState({ rating: e.target.value })}
              type="range"
              min="1"
              max="5"
              className="form-control"
              id="movieRatingEdit"
              placeholder="Rating"
            />
          </div>
          <div className="form-group">
            <label htmlFor="movieDescriptionEdit">New Description</label>
            <textarea
              rows="5"
              onChange={(e) => this.setState({ description: e.target.value })}
              type="text"
              className="form-control"
              id="movieDescriptionEdit"
              placeholder="Description"
              style={{
                borderColor:
                  this.state.description !== "" && this.state.title.length < 300
                    ? "green"
                    : "red"
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
        {this.state.error ? (
          <p style={{ color: "red", textAlign: "center" }}>
            something went wrong, please try agin
          </p>
        ) : (
          <p />
        )}
      </div>
    );
  }
}
export default EditMovie;
