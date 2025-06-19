export default function getSearchURL(query) {
  return `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=ko&page=1`;
}
