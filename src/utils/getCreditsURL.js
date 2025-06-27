const getCreditsURL = (id) => {
  return `https://api.themoviedb.org/3/movie/${id}/credits?language=ko-KR`;
};

export default getCreditsURL;
