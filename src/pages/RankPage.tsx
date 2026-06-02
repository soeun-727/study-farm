import React from "react";
import RankingItem from "../components/Rank/RankingItem"; 


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
      "src/assets/crops/벼.svg",
      "src/assets/crops/바나나.svg",
      "src/assets/crops/고구마.svg",
    ],
  },
  {
    id: 2,
    rank: 2,
    nickname: "열공맨",
    totalStudyMinutes: 9870,
    joinDays: 45,
    avatarUrl: "src/assets/characters/lv1farmer.svg",
    crops: [
      "src/assets/crops/망고.svg",
      "src/assets/crops/딸기.svg",
    ],
  },
  {
    id: 3,
    rank: 3,
    nickname: "상추도사",
    totalStudyMinutes: 5430,
    joinDays: 20,
    avatarUrl: "src/assets/characters/lv1farmer.svg",
    crops: [
      "src/assets/crops/밀.svg",
      "src/assets/crops/옥수수.svg",
    ],
  },
];

export default function RankPage() {
  return (
    
    <div className="min-h-screen bg-(--primary-light-brown) border-t-[10px] border-b-[10px] border-l-[10px] border-(--primary-brown) relative flex flex-col items-center py-[18px]">
     {/*피그마에 20px로 되어있는데 두꺼워서 임의로 10px로 변경*/}

      <h1 className="text-(--gray-900) mb-12 typo-h1">
        열공농장 농부 랭킹
      </h1>

      <div className="w-full max-w-[1320px] h-[790px] px-5 flex flex-col mx-auto">
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