export default function getMovieDetailsURL(movieId) {
  return `https://api.themoviedb.org/3/movie/${movieId}?language=ko`;
}
