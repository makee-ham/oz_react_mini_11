export default function getTopRatedMovies(movies, count = 20) {
  return [...movies]
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, count);
}
