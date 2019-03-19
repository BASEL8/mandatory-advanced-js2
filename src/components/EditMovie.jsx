import React, { Component } from "react";
import { Helmet } from "react-helmet";
class EditMovie extends Component {
  state = {
    errors: {},
    serverError: false,
    info: {
      title: "",
      director: "",
      description: "",
      rating: 0
    },
    originalInfo: {},
    sameInfo: true
  };

  validate = () => {
    const errors = {};
    const { info } = this.state;
    if (info.title.trim() === "") errors.title = "Title is required";
    if (info.title.trim().length > 40)
      errors.title = " Must be less than 40 letters long";
    //director
    if (info.director.trim() === "") errors.director = "Director is required";
    if (info.director.trim().length > 40)
      errors.director = " Must be less than 40 letters long";
    //rating
    if (info.rating === undefined) errors.rating = "You need to rate the movie";

    //description
    if (info.description.trim() === "")
      errors.description = "Description is required";
    if (info.description.trim().length > 300)
      errors.description = " Must be less than 300 letters long";

    return Object.keys(errors).length === 0 ? {} : errors;
  };
  validateProperty = ({ name, value }) => {
    if (name === "title") {
      if (value.trim() === "") return "Title is required";
      if (value.trim().length > 40) return " must be less than 40 letters long";
    }
    if (name === "director") {
      if (value.trim() === "") return "Director is required";
      if (value.trim().length > 40) return " must be less than 40 letters long";
    }
    if (name === "description") {
      if (value.trim() === "") return "Description is required";
      if (value.trim().length > 300)
        return " must be less than 300 letters long";
    }
  };
  handleAddMovie = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    const { info, originalInfo } = this.state;
    if (Object.keys(errors).length > 0) return;
    if (!this.objectsIsEquivalent(originalInfo, info)) {
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
            this.setState({ serverError: true });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.props.history.push("/Home");
    }
  };
  componentDidMount() {
    fetch(
      "http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/" +
        this.props.match.params.id
    )
      .then((response) => response.json())
      .then((info) => {
        this.setState({ info, originalInfo: info });
      });
  }
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      if (errors[input.name]) delete errors[input.name];
    }
    const info = { ...this.state.info };
    const { originalInfo } = this.state;
    info[input.name] = input.value;
    this.setState({
      info,
      errors,
      sameInfo: this.objectsIsEquivalent(originalInfo, info)
    });
  };
  objectsIsEquivalent = (a, b) => {
    let aProps = Object.getOwnPropertyNames(a);
    let bProps = Object.getOwnPropertyNames(b);
    if (aProps.length !== bProps.length) {
      return false;
    }
    for (let i = 0; i < aProps.length; i++) {
      let propName = aProps[i];
      if (a[propName] !== b[propName]) {
        return false;
      }
    }
    return true;
  };

  render() {
    const { info, errors, serverError, sameInfo } = this.state;
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
            />
            {errors.title ? (
              <small id="movieTitle" className="form-text text-danger">
                {errors.title}
              </small>
            ) : null}
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
            />
            {errors.director ? (
              <small id="movieTitle" className="form-text text-danger">
                {errors.director}
              </small>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="movieRatingEdit">
              New Rating :{" "}
              {Array(parseInt(info.rating))
                .fill("🤩")
                .join("")}
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
            />
            {errors.rating ? (
              <small id="movieTitle" className="form-text text-danger">
                {errors.rating}
              </small>
            ) : null}
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
            />
            {errors.description ? (
              <small id="movieTitle" className="form-text text-danger">
                {errors.description}
              </small>
            ) : null}
          </div>
          {serverError ? (
            <p>
              please try again there is a problem with the server and we will
              fix it as soon as possible{" "}
            </p>
          ) : null}
          <button type="submit" className="btn btn-primary">
            {sameInfo ? "back" : "edit"}
          </button>
        </form>
      </div>
    );
  }
}
export default EditMovie;
