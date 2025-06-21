export default function getSearchURL(query, page = 1) {
  const base = "https://api.themoviedb.org/3/search/movie";
  const params = new URLSearchParams({ query, page }); // 객체를 URL 쿼리 스트링처럼 생긴 객체로 바꿔주는 JavaScript 내장 클래스 - 문자열처럼 생긴 객체이므로 toString 필요
  return `${base}?${params.toString()}&language=ko`;
}
