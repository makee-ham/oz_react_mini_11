export default function MovieCard() {
  return (
    <div>
      {/* 포스터 이미지 */}
      <div>
        <img src={"https://image.tmdb.org/t/p/w500"} alt={"#"} />
      </div>
      {/* 텍스트 영역 */}
      <div>
        <h3>{"영화 제목"}</h3>
        <p>{"평점"}</p>
      </div>
    </div>
  );
}
