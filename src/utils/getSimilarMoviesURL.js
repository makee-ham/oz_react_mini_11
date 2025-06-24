const getSimilarMoviesURL = (id) => {
  return `https://api.themoviedb.org/3/movie/${id}/similar?language=ko-KR&page=1`;
};

export default getSimilarMoviesURL;
