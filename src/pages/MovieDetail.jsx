import { useState } from "react";
import dummy from "../data/movieDetailData.json";

export default function MovieDetail() {
  const [detailData, _] = useState(dummy);
  return (
    <section>
      <article>포스터</article>
      <article>
        <div>
          <h2>제목</h2>
          <h3>평점</h3>
        </div>
        <div>
          <h4>장르</h4>
        </div>
        <div>
          <p>줄거리</p>
        </div>
      </article>
    </section>
  );
}
