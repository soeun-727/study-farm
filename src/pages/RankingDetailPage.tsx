import { useNavigate } from "react-router-dom";
import BackButtonIcon from "../components/ui/BackButton";

// 임시 더미 데이터
const USER_DETAIL_DATA = {
  id: 1,
  rank: 1,
  nickname: "공부하는농부",
  level: 1,
  badge: "🥇",
  joinDays: 365,
  avatarUrl: "/src/assets/characters/lv1farmer.svg",
  crops: [
    "/src/assets/crops/rice.svg",
    "/src/assets/crops/potato.svg",
    "/src/assets/crops/corn.svg",
    "/src/assets/crops/blueberry.svg",
    "/src/assets/crops/banana.svg",
    "/src/assets/crops/mango.svg",
    "/src/assets/crops/watermelon.svg",
    "/src/assets/crops/mango.svg",
    "/src/assets/crops/watermelon.svg",
  ],
};

export default function RankingDetailPage() {
  const navigate = useNavigate();

  // 행 구성을 위한 배열 생성 (7칸, 6칸)
  const topRowCells = Array.from({ length: 7 });
  const bottomRowCells = Array.from({ length: 6 });

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-(--primary-light-brown) relative flex overflow-hidden">
      
       {/* 상단 뒤로가기 버튼 */}
        <button
          onClick={handleGoBack}
          className="absolute top-8 left-0 cursor-pointer transition hover:opacity-70 scale-90"
        >
          <BackButtonIcon />
        </button>

      {/* 왼쪽 사이드 영역 */}
      <div className="w-60 shrink-0 z-10" />

      {/* 중앙 메인 콘텐츠 */}
      <main className="flex-1 flex flex-col items-center justify-start pt-10 h-full relative">
        
       
        {/* 타이틀 */}
        <h1 className="typo-h1 text-gray-900 mb-3 mt-14">
          농부 염탐
        </h1>

        {/* 순위 뱃지 */}
        <div className="flex h-[32px] min-w-[65px] items-center justify-center gap-1 rounded-full bg-(--primary-brown) px-3 my-3 typo-h3 text-(--gray-0)">
          <span>{USER_DETAIL_DATA.badge}</span>
          <span>{USER_DETAIL_DATA.rank}위</span>
        </div>

        {/* 중앙 아바타 이미지 */}
        <img
          src={USER_DETAIL_DATA.avatarUrl}
          alt="농부 아바타"
          className="h-[180px] object-contain mb-3 drop-shadow-md"
        />

        {/* 닉네임 박스 */}
        <div className="bg-white border-[3px] border-(--primary-brown)/50 text-(--gray-900) px-6 py-1 rounded-lg typo-h2 mb-3">
          {USER_DETAIL_DATA.nickname}
        </div>

        {/* 레벨 및 가입일 정보 */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-(--primary-orange) typo-h2">
            Level {USER_DETAIL_DATA.level}
          </span>
          <div className="bg-white px-3 py-1 rounded-full typo-body text-gray-700 shadow-sm">
            농부가 된 지 {USER_DETAIL_DATA.joinDays}일 째 🌱
          </div>
        </div>

        {/* 수확한 작물 인벤토리*/}
        <div className="bg-(--primary-brown) rounded-2xl px-6 py-5 flex flex-col gap-3 shadow-lg">
          
          {/* 1번째 행 (7칸) */}
          <div className="flex justify-start gap-3 w-fit">
            {topRowCells.map((_, index) => {
              const imgSrc = USER_DETAIL_DATA.crops[index];
              return (
                <div key={`top-${index}`} className="flex items-center justify-center w-[45px] h-[45px]">
                  {imgSrc && (
                    <img 
                      src={imgSrc} 
                      className="w-[45px] h-[45px] object-contain hover:scale-110 transition-transform" 
                      alt="crop" 
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* 2번째 행 (6칸) */}
          <div className="flex justify-start gap-3 w-fit">
            {bottomRowCells.map((_, index) => {
              const actualIndex = index + 7;
              const imgSrc = USER_DETAIL_DATA.crops[actualIndex];
              return (
                <div key={`bottom-${index}`} className="flex items-center justify-center w-[45px] h-[45px]">
                  {imgSrc && (
                    <img 
                      src={imgSrc} 
                      className="w-[45px] h-[45px] object-contain hover:scale-110 transition-transform" 
                      alt="crop" 
                    />
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </main>

      {/* 오른쪽 사이드 영역 */}
      <div className="w-60 shrink-0 z-10" />

    </div>
  );
}