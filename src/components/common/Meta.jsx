import { Helmet } from "react-helmet";

export default function Meta({
  title = "CineVisor - 영화, 당신만의 시선으로 보다",
  description = "CineVisor는 최신 영화, 감독, 배우 정보를 한눈에 볼 수 있는 영화 정보 큐레이션 사이트입니다. 마음에 드는 영화를 북마크하고, 감각적인 UI로 영화를 탐색해보세요.",
  keywords = "영화 추천, 최신 영화, 인기 영화, 명작 영화, 영화 장르, TMDB, 영화 배우, 감독, 북마크, 영화 큐레이션, CineVisor, 씨네바이저, 시네바이저",
  image = "/cvIcon.webp",
  url = "https://oz-react-mini-11-nine.vercel.app/",
  robots = "index, follow",
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="x-ua-compatible" content="IE=edge" />
      <meta name="robots" content={robots} />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}
