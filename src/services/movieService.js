import http from './httpService';

export function getMovies() {
  return http.get('movies');
}

export function getMovie(id) {
  return http.get('movies/'+id);
}

export async function saveMovie(movie) {

if (movie._id) {
    const data = { ...movie };
    delete data._id;
    return http.put('movies/'+movie._id, data);
  }

  return http.post('movies/', movie);
}

export function deleteMovie(id) {
  return http.delete('movies/'+id);
}
