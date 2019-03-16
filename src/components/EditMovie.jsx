import React, { Component } from "react";
import { Helmet } from "react-helmet";
class EditMovie extends Component {
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
      "http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/" +
        this.props.match.params.id,
      {
        method: "PUT",
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
          this.setState({
            error: true
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    fetch(
      "http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/" +
        this.props.match.params.id
    )
      .then((response) => response.json())
      .then((info) => this.setState({ info }));
  }
  handleChange = ({ currentTarget: input }) => {
    const info = { ...this.state.info };
    info[input.name] = input.value;
    this.setState({ info });
  };
  render() {
    const { info, error } = this.state;
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
              onChange={this.handleChange}
              name="title"
              value={info.title}
              type="text"
              className="form-control"
              id="movieTitleEdit"
              placeholder="title"
              style={{
                borderColor:
                  info.title !== "" && info.title.length < 40 ? "green" : "red"
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="movieDirectorEdit">New Director</label>
            <input
              onChange={this.handleChange}
              name="director"
              value={info.director}
              type="text"
              className="form-control"
              id="movieDirectorEdit"
              placeholder="Director"
              style={{
                borderColor:
                  info.director !== "" && info.director.length <= 40
                    ? "green"
                    : "red"
              }}
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="movieRatingEdit"
              style={{
                color: info.rating >= 0 && info.rating <= 5 ? "green" : "red"
              }}
            >
              New Rating
            </label>
            <input
              onChange={this.handleChange}
              name="rating"
              value={info.rating}
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
              onChange={this.handleChange}
              name="description"
              value={info.description}
              type="text"
              className="form-control"
              id="movieDescriptionEdit"
              placeholder="Description"
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
export default EditMovie;
