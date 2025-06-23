export default function BookmarkSection() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">북마크한 영화</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {/* 북마크 아이템은 추후 데이터 받아서 구현 */}
        <div className="aspect-[2/3] bg-[--bg-secondary] rounded-md"></div>
        <div className="aspect-[2/3] bg-[--bg-secondary] rounded-md"></div>
        <div className="aspect-[2/3] bg-[--bg-secondary] rounded-md"></div>
        <div className="aspect-[2/3] bg-[--bg-secondary] rounded-md"></div>
      </div>
    </div>
  );
}
