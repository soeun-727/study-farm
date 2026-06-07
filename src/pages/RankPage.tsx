import { useState } from "react";
import RankingItem from "../components/rank/RankingItem"; 
import { RightArrow } from "../assets/home/homeIndex";
import { useNavigate } from "react-router-dom";

//테스트용 더미 데이터
const DUMMY_RANKING_DATA = [
  {
    id: 1,
    rank: 1,
    nickname: "공부하는농부님",
    totalStudyMinutes: 12345,
    joinDays: 56,
    avatarUrl: "src/assets/characters/lv1farmer.svg", 
    crops: [
      "src/assets/crops/apple.svg",
      "src/assets/crops/banana.svg",
      "src/assets/crops/corn.svg",
      "src/assets/crops/corn.svg",
      "src/assets/crops/corn.svg",
      "src/assets/crops/corn.svg",
      "src/assets/crops/corn.svg",
      "src/assets/crops/corn.svg",
    ],
  },
  {
    id: 2,
    rank: 2,
    nickname: "열공맨",
    totalStudyMinutes: 9870,
    joinDays: 45,
    avatarUrl: "src/assets/characters/lv2farmer.svg",
    crops: [
      "src/assets/crops/banana.svg",
      "src/assets/crops/corn.svg",
    ],
  },
  {
    id: 3,
    rank: 3,
    nickname: "상추도사",
    totalStudyMinutes: 5430,
    joinDays: 20,
    avatarUrl: "src/assets/characters/lv3farmer.svg",
    crops: [
      "src/assets/crops/banana.svg",
      "src/assets/crops/corn.svg",
    ],
  },
   {
    id: 4,
    rank: 4,
    nickname: "열무",
    totalStudyMinutes: 1170,
    joinDays: 21,
    avatarUrl: "src/assets/characters/lv4farmer.svg",
    crops: [
      "src/assets/crops/banana.svg",
      "src/assets/crops/corn.svg",
      "src/assets/crops/banana.svg",
    ],
  },
];

export default function RankPage() {
  
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);
  const navigate = useNavigate();
  
  // 경로 설정 필요
  const handleGoBack = () => {
    console.log("이전 페이지로 이동!"); 
    navigate('/'); 
  };
  
  return (
    // 1. 전체 컨테이너: h-screen과 overflow-hidden을 주어 전체 화면 스크롤 방지
    <div className="h-screen w-full bg-(--primary-light-brown) box-border border-t-10 border-b-10 border-l-10 border-(--primary-brown) flex relative overflow-hidden">
      
      {/* 왼쪽 영역 */}
      <div
        className={`
          w-60 shrink-0 transition-colors duration-300 z-10
        `}
      />

      {/* 중앙 메인 콘텐츠: h-full 설정, 내부 하단 패딩(pb-15) 제거하고 상단(pt-15)만 유지 */}
      <main className="flex-1 flex flex-col items-center pt-15 h-full">
        {/* 헤더: shrink-0을 주어 스크롤 박스가 밀어올려도 찌그러지지 않게 고정 */}
        <h1 className="text-(--gray-900) mb-15 typo-h1 shrink-0">
          열공농장 농부 랭킹
        </h1>

        {/* 2. 스크롤 영역: flex-1과 overflow-y-auto를 추가하여 이 안에서만 스크롤되도록 설정. 하단 여백 확보를 위해 pb-15 추가 */}
        <div className="w-full max-w-[1320px] px-5 flex flex-col mx-auto flex-1 overflow-y-auto pb-15 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {DUMMY_RANKING_DATA.map((item, index) => (
            <div key={item.id} className="w-full flex flex-col items-center">

            <RankingItem
              key={item.id}
              rank={item.rank}
              nickname={item.nickname}
              totalStudyMinutes={item.totalStudyMinutes}
              joinDays={item.joinDays}
              avatarUrl={item.avatarUrl}
              crops={item.crops}
            />

            {index !== DUMMY_RANKING_DATA.length - 1 && (
                <div className="w-full h-[2px] bg-(--gray-400) rounded-full mb-7" />
              )}

        </div>
          ))}

        
        </div>
      </main>

      {/* 오른쪽 영역 */}
      <div
        className={`
          w-60 shrink-0 transition-colors duration-300 z-10 relative
          ${hoverSide === "right" ? "bg-(--gray-0)" : ""}
        `}
        onMouseEnter={() => setHoverSide("right")}
        onMouseLeave={() => setHoverSide(null)}
      >
        <button 
          onClick={handleGoBack}
          className="absolute right-20 top-1/2 -translate-y-1/2 w-15 transition-transform active:scale-95"
        >
          <RightArrow className="w-full animate-bounce-right" />
        </button>
      </div>

    </div>
  );
}