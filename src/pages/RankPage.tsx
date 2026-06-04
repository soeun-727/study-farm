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
  //왼쪽화면 호버 상태감지, 경로설정필요
  const [hoverSide, setHoverSide] = useState<"right" | null>(null);
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    console.log("이전 페이지로 이동!"); 
    navigate('/'); 
    
  };
  
  return (
    
    <div className="min-h-screen bg-(--primary-light-brown) box-border border-t-10 border-b-10 border-l-10 border-(--primary-brown) relative flex flex-col items-center py-15 ">
     
     {/* 오른쪽 감지 영역 & 화살표 버튼 */}
      <div
        className="fixed right-0 top-0 w-60 h-full z-40"
        onMouseEnter={() => setHoverSide("right")}
        onMouseLeave={() => setHoverSide(null)}
      >
        
        <button onClick={handleGoBack}  //오류나는 이유 파악 어렵습니다..
        className="absolute right-20 top-1/2 -translate-y-1/2 w-15 transition-transform active:scale-95">
          <RightArrow className="w-full animate-bounce-right" />
          
        </button>
      </div>

      <div className={` 
          fixed right-0 top-0 w-60 h-full z-0 transition-colors duration-300 pointer-events-none
          ${hoverSide === "right" ? "bg-(--gray-0)" : ""}
        `}
      />

      <h1 className="text-(--gray-900) my-15 typo-h1">
        열공농장 농부 랭킹
      </h1>

      <div className="w-full max-w-[1320px] min-h-[790px] px-5 flex flex-col mx-auto">
        {DUMMY_RANKING_DATA.map((item) => (
          <RankingItem
            key={item.id}
            rank={item.rank}
            nickname={item.nickname}
            totalStudyMinutes={item.totalStudyMinutes}
            joinDays={item.joinDays}
            avatarUrl={item.avatarUrl}
            crops={item.crops}
          />
        ))}
      </div>
      
    </div>
  );
}