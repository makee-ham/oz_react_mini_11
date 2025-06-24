const getSimilarMoviesURL = (id, page) => {
  return `https://api.themoviedb.org/3/movie/${id}/similar?language=ko-KR&page=${page}`;
};

export default getSimilarMoviesURL;
