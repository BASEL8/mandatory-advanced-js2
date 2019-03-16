import React, { Component } from "react";
import { Helmet } from "react-helmet";

class AddMovie extends Component {
  state = {
    error: false,
    info: {
      title: "",
      director: "",
      description: "",
      rating: 0
    }
  };
  handleAddMovie = (e) => {
    e.preventDefault();
    fetch(
      "http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.info)
      }
    )
      .then((response) => {
        if (response.ok) {
          this.props.history.push("/Home");
        } else {
          this.setState({ error: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleChange = ({ currentTarget: input }) => {
    const info = { ...this.state.info };
    info[input.name] = input.value;
    this.setState(
      {
        info
      },
      () => console.log(this.state.info)
    );
  };
  render() {
    const { info, error } = this.state;
    return (
      <div className="flex-grow-1">
        <Helmet>
          <title>Add Movies</title>
        </Helmet>
        <form onSubmit={this.handleAddMovie}>
          <div className="form-group">
            <label htmlFor="movieTitle">Title</label>
            <input
              onChange={this.handleChange}
              type="text"
              className="form-control"
              id="movieTitle"
              placeholder="title"
              name="title"
              style={{
                borderColor:
                  info.title !== "" && info.title.length < 40 ? "green" : "red"
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="movieDirector">Director</label>
            <input
              onChange={this.handleChange}
              name="director"
              type="text"
              className="form-control"
              id="movieDirector"
              placeholder="Director"
              style={{
                borderColor:
                  info.director !== "" && info.director.length < 40
                    ? "green"
                    : "red"
              }}
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="movieDRating"
              style={{
                color: info.rating >= 0 && info.rating <= 5 ? "green" : "red"
              }}
            >
              Rating
            </label>
            <input
              onChange={this.handleChange}
              name="rating"
              type="range"
              min="1"
              max="5"
              className="form-control"
              id="movieRating"
              placeholder="Rating"
            />
          </div>
          <div className="form-group">
            <label htmlFor="movieDescription">Description</label>
            <textarea
              onChange={this.handleChange}
              name="description"
              type="text"
              className="form-control"
              id="movieDescription"
              placeholder="Description"
              rows="5"
              style={{
                borderColor:
                  info.description !== "" && info.title.length < 300
                    ? "green"
                    : "red"
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
        {error ? (
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

export default AddMovie;
