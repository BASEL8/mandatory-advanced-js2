import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Joi from "joi-browser";
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
  schema = {
    title: Joi.string()
      .max(40)
      .min(1)
      .required()
      .label("Title"),
    director: Joi.string()
      .max(40)
      .min(1)
      .required()
      .label("Director"),
    description: Joi.string()
      .max(300)
      .min(1)
      .required()
      .label("Description"),
    rating: Joi.number()
      .integer()
      .max(5)
      .required()
      .label("Rating")
  };
  validate = () => {
    const joiOptions = { abortEarly: false };
    const { error } = Joi.validate(this.state.info, this.schema, joiOptions);
    if (!error) return null;
    return error.details.reduce((errors, error) => {
      errors[error.path] = error.message;
      return errors;
    }, {});
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  handleAddMovie = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;
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
            {errors && errors.title ? (
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
            {errors && errors.director ? (
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
            {errors && errors.rating ? (
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
            {errors && errors.description ? (
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
