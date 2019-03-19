import React, { Component } from "react";
import { Helmet } from "react-helmet";

class AddMovie extends Component {
  state = {
    errors: {},
    serverError: false,
    info: {
      title: "",
      director: "",
      description: "",
      rating: 1
    }
  };
  validate = () => {
    const errors = {};
    const { info } = this.state;
    if (info.title.trim() === "") errors.title = "Title is required";
    if (info.title.trim().length > 40)
      errors.title = " must be less than 40 letters long";
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
    console.log(errors);
    if (Object.keys(errors).length > 0) return;
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
          this.setState({ serverError: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleChange = ({ currentTarget: input }) => {
    const info = { ...this.state.info };
    info[input.name] = input.value;
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    console.log(this.validateProperty(input));

    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      if (errors[input.name]) delete errors[input.name];
    }
    this.setState({
      info,
      errors
    });
  };
  render() {
    const { info, errors, serverError } = this.state;
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
            />
            {errors.title ? (
              <small id="movieTitle" className="form-text text-danger">
                {errors.title}
              </small>
            ) : null}
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
            />
            {errors.director ? (
              <small id="movieTitle" className="form-text text-danger">
                {errors.director}
              </small>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="movieDRating">
              Rating :
              {Array(parseInt(info.rating))
                .fill("🤩")
                .join("")}
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
              value={info.rating}
            />
            {errors.rating ? (
              <small id="movieTitle" className="form-text text-danger">
                {errors.rating}
              </small>
            ) : null}
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
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default AddMovie;
