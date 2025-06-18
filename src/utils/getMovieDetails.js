export default function getMovieDetailsURL(movieId) {
  return `https://api.themoviedb.org/3/list/${movieId}/list_id?language=ko&page=1`;
}
