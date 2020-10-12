import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Like from "./common/like";
import GenreList from "./common/genreList";
import Pagination from "./common/pagination";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import { Link } from "react-router-dom";
import auth from '../services/authService';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const {data: genres} = await getGenres();
    const {data: movies} = await getMovies();
    
    this.setState({ movies, genres});
  }

  handleDeleteMovie = async (movie) => {
    let movieList = this.state.movies;
    this.setState({ movies: movieList.filter((m) => m._id !== movie._id) });

    try{
      await deleteMovie(movie._id)
    }catch(error){
      
      if(error && error.status === 404){
        alert("This movie is already deleted.")
         this.setState({movies:movieList});
      }
    }

  };

  handleLike = (movie) => {
    let movieList = this.state.movies;
    const index = movieList.indexOf(movie);
    movieList[index] = { ...movieList[index] };
    movieList[index].liked = !movieList[index].liked;

    this.setState({ movies: movieList });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  raiseSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  searchMovies = (e) => {
    this.setState({
      selectedGenre: null,
      searchQuery: e.currentTarget.value,
      currentPage: 1,
    });
  };

  getPagedData = () => {
    const {
      movies,
      currentPage,
      pageSize,
      selectedGenre,
      searchQuery,
      sortColumn,
    } = this.state;

    let filteredMovies = movies;
    if (searchQuery)
      filteredMovies = movies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filteredMovies = movies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    return {
      totalCount: filteredMovies.length,
      movieList: paginate(sorted, currentPage, pageSize),
    };
  };

  render() {
  const user = auth.getCurrentUser();

    const {
      movies,
      currentPage,
      pageSize,
      genres,
      selectedGenre,
      sortColumn,
    } = this.state;

    const headers = [
      {
        path: "title",
        label: "Title",
        content: (movie) => (
          <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        ),
      },
      { path: "genre.name", label: "Genre" },
      { path: "numberInStock", label: "Stock" },
      { path: "dailyRentalRate", label: "Rate" },
      {
        key: "likeHeart",
        content: (movie) => (
          <Like liked={movie.liked} onClick={() => this.handleLike(movie)} />
        ),
      },
     ];

     if(user && user.isAdmin){
       headers.push({
        key: "deleteButton",
        content: (movie) => (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => this.handleDeleteMovie(movie)}
          >
            Delete
          </button>
        )
      })
     }

    const { totalCount, movieList } = this.getPagedData();
    const { length: count } = movies;
    
    if (count === 0) return <p>There are no movies in the database.</p>;

    return (
      <div className="row">
        <div className="col-3">
          <GenreList
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>

        <div className="col">
          {user && <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>}
          
          <p>Showing {count} movies in the database.</p>

          <input
            type="text"
            id="search"
            name="search"
            placeholder="search..."
            onChange={this.searchMovies}
            className="form-control"
          />

          <table className="table">
            <TableHeader
              sortColumn={sortColumn}
              raiseSort={this.raiseSort}
              columnHeaders={headers}
            />
            <TableBody
              items={movieList}
              columnHeaders={headers}
              handleLike={this.handleLike}
              handleDeleteMovie={this.handleDeleteMovie}
            />
          </table>

          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
