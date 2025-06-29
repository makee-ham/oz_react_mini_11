export const defaultKeywords =
  "영화 추천, 최신 영화, 인기 영화, 명작 영화, 영화 장르, TMDB, 영화 배우, 감독, 북마크, 영화 큐레이션, CineVisor, 씨네바이저, 시네바이저";

// 왓챠 참고
export function detailedKeywords(movieTitle) {
  return `${movieTitle}, ${movieTitle} 보기, ${movieTitle} 다시보기, ${movieTitle} 감상하기, ${movieTitle} 보는곳, ${movieTitle} 구매, ${movieTitle} 구매하기, ${movieTitle} vod, ${defaultKeywords}`;
}
