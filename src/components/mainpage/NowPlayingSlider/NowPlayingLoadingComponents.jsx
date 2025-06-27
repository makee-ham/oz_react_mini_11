// 스켈레톤 로딩 컴포넌트
export const SliderSkeleton = () => {
  return (
    <section className="w-full h-[90vh] lg:h-[85vh] md:h-[75vh] relative mt-16 lg:mt-20 overflow-hidden bg-gray-900">
      {/* 메인 배경 스켈레톤 */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 animate-pulse" />

        {/* 움직이는 그라데이션 효과 */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer transform -skew-x-12"
          style={{
            animation: "shimmer 2s infinite",
            backgroundSize: "200% 100%",
          }}
        />
      </div>

      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900 z-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-25" />

      {/* 컨텐츠 스켈레톤 */}
      <div className="absolute bottom-8 lg:bottom-12 xl:bottom-16 left-4 lg:left-6 xl:left-12 z-30 max-w-[90%] lg:max-w-2xl">
        {/* 태그와 평점 */}
        <div className="mb-2 lg:mb-3 flex items-center gap-2 flex-wrap">
          <div className="w-24 h-6 bg-gray-600 rounded-full animate-pulse" />
          <div className="w-16 h-5 bg-gray-600 rounded animate-pulse" />
        </div>

        {/* 제목 */}
        <div className="mb-2 lg:mb-4 space-y-2">
          <div className="w-3/4 h-8 lg:h-12 xl:h-14 bg-gray-600 rounded animate-pulse" />
          <div className="w-1/2 h-6 lg:h-10 xl:h-12 bg-gray-600 rounded animate-pulse" />
        </div>

        {/* 설명 - 데스크톱만 */}
        <div className="hidden lg:block mb-4 lg:mb-6 space-y-2">
          <div className="w-full h-4 bg-gray-600 rounded animate-pulse" />
          <div className="w-4/5 h-4 bg-gray-600 rounded animate-pulse" />
          <div className="w-3/4 h-4 bg-gray-600 rounded animate-pulse" />
        </div>

        {/* 버튼들 */}
        <div className="flex items-center gap-2 lg:gap-4">
          <div className="w-28 lg:w-32 h-10 lg:h-12 bg-gray-600 rounded-lg animate-pulse" />
          <div className="hidden lg:block w-24 lg:w-28 h-10 lg:h-12 bg-gray-600 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* 프로그레스 바 */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-700 z-40">
        <div className="h-full w-1/3 bg-gray-500 animate-pulse" />
      </div>

      {/* 도트 인디케이터 - 태블릿 이상 */}
      <div className="hidden lg:flex absolute bottom-6 left-1/2 transform -translate-x-1/2 space-x-3 z-40">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full animate-pulse ${
              index === 0 ? "bg-gray-500 scale-125" : "bg-gray-600"
            }`}
          />
        ))}
      </div>

      {/* 모바일 슬라이드 인디케이터 */}
      <div className="lg:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 z-40">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full animate-pulse ${
              index === 0 ? "bg-gray-500 w-8" : "bg-gray-600 w-2"
            }`}
          />
        ))}
      </div>

      {/* 네비게이션 버튼 - 데스크톱만 */}
      <div className="hidden xl:block absolute left-4 top-1/2 transform -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-gray-700/50 animate-pulse" />
      <div className="hidden xl:block absolute right-4 top-1/2 transform -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-gray-700/50 animate-pulse" />

      {/* 영화 카운터 - 태블릿 이상만 */}
      <div className="hidden lg:block absolute top-6 right-6 z-40 px-4 py-2 bg-gray-700/50 rounded-full">
        <div className="w-12 h-4 bg-gray-600 rounded animate-pulse" />
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
      `}</style>
    </section>
  );
};

// 에러 컴포넌트
export const SliderError = ({ onRetry }) => {
  return (
    <section className="w-full h-[90vh] lg:h-[85vh] md:h-[75vh] relative mt-16 lg:mt-20 overflow-hidden">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900" />

      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* 에러 컨텐츠 */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="text-center px-4 max-w-md">
          {/* 에러 아이콘 */}
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-red-500/20 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
          </div>

          {/* 에러 메시지 */}
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            영화 정보를 불러올 수 없습니다
          </h2>

          <p className="text-gray-300 mb-8 leading-relaxed">
            네트워크 연결을 확인하거나
            <br />
            잠시 후 다시 시도해주세요.
          </p>

          {/* 재시도 버튼 */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onRetry}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              다시 시도
            </button>

            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-all duration-300"
            >
              페이지 새로고침
            </button>
          </div>
        </div>
      </div>

      {/* 장식적 요소들 */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-red-500/5 rounded-full blur-3xl" />
    </section>
  );
};
