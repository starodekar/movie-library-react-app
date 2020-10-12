import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie} from "../services/movieService";

class MovieForm extends Form {
  state = {
    formData: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
    genres: [],
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate"),
  };

  async componentDidMount() {
    const {data:genres} = await getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (!movieId) return;

    try{
      const {data: movie} = await getMovie(movieId);
      const formData = {
      _id: movieId,  
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
    this.setState({ formData });
    } catch (error) {
      if(error && error.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  submit = async () => {
    await saveMovie(this.state.formData)
    
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderSubmitButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
