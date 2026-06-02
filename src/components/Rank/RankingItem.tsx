import { Link } from "react-router-dom";


interface RankingItemProps {
  rank: number;
  nickname: string;
  totalStudyMinutes: number;
  joinDays: number;
  avatarUrl: string;
  crops: string[];
}

export default function RankingItem({
  rank,
  nickname,
  totalStudyMinutes,
  joinDays,
  avatarUrl,
  crops,
}: RankingItemProps) {
  
  // 랭크별 테두리 색상
  const getRankBorderStyle = (rank: number) => {
    switch (rank) {
      case 1:
      case 2:
      case 3:
        return "border-transparent bg-gradient-to-br from-(--primary-orange) to-(--primary-yellow) bg-clip-border";
      default:
        return "border-(--primary-brown)/50";
    }
  };

  // 랭크별 메달 아이콘 및 배경색
  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return { icon: "🥇", bg: "bg-(--primary-brown)/50" }; 
      case 2:
        return { icon: "🥈", bg: "bg-(--primary-brown)/50" };
      case 3:
        return { icon: "🥉", bg: "bg-(--primary-brown)/50" };
      default:
        return {icon: "",bg: "bg-(--primary-brown)/50" };
    }
  };

  const badge = getRankBadge(rank);

  return (
    <>
    <div className="flex items-center gap-9 pb-9">
      
      {/*프로필*/}
      <div
        className={`
          flex
          h-[220px]
          w-[220px]
          shrink-0
          items-center
          justify-center
          rounded-lg
          border-[5px]
          ${getRankBorderStyle(rank)}
        `}
      >
        <div className="flex h-full w-full items-center justify-center rounded bg-(--gray-0)">
        <img
          src={avatarUrl}
          alt={nickname}
          className="h-full w-full object-contain p-2 "
        />
      </div>
      </div>

      {/*정보 카드*/}
      <div className="flex flex-1 flex-col items-center h-[220px]">
        
        {/* 상단 카드 */}
        <div
          className="
            flex
            h-[100px]
            w-[900px]
            items-center
            justify-between
            rounded-lg
            bg-(--gray-0)
            px-5
          "
        >
          <div className="flex items-center gap-11">
            {/* 순위 뱃지 */}
            <div
              className={`
                flex
                h-[55px]
                min-w-[95px]
                items-center
                justify-center
                gap-1
                rounded-full
                ${badge.bg}
                px-5
                typo-h3
                text-(--gray-0)
              `}
            >
              <span>{badge.icon}</span>
              <span>{rank}위</span>
            </div>

            {/* 닉네임 */}
            <div className="flex items-center">
            <span className="typo-h2 text-(--primary-brown) mr-1">
              {nickname}
            </span>
            <span className="typo-h2 text-(--gray-900) ">
              님
            </span>
            </div>
          </div>

          <div className="h-[70px] border-r-[5px] border-(--gray-400)"></div>

          {/* 공부 시간 정보 */}
          <div className="typo-h2 text-(--gray-800)">
            총 공부 시간{" "}
            <span className="text-(--primary-orange)">
              {totalStudyMinutes.toLocaleString()}분!
            </span>
            <span className="ml-2">
              농부가 된 지{" "}
              <span className="text-(--primary-orange)">
                {joinDays}일 째
              </span>{" "}
              🌱
            </span>
          </div>
        </div>

        {/* 하단 카드 */}
        <div
          className="
            relative
            flex
            h-[120px]
            w-[950px]
            flex-col
            justify-center
            rounded-lg
            bg-(--primary-brown)/50
            px-5
          "
        >    
          <div className="flex items-center justify-between mb-5 w-full">               
          {/* 작물 카드 타이틀 */}
          <span className="typo-caption text-(--gray-0)">
            {nickname}님의 수확한 작물
          </span>

          {/* 전체보기 버튼 */}
          <Link
            to="../pages/RankDetail" // 실제 경로로 수정 필요
            className="
              typo-caption
              text-(--primary-brown)
              transition
              hover:text-white
            "
          >
            전체 보기 &gt;
          </Link>

          </div>


          {/* 작물 이모지 목록 */}
          <div className="flex items-center gap-5">
            {crops.map((crop, index) => (
              <img 
                  key={index} 
                  src={crop} 
                  alt="crop" 
                  className="h-[50px] w-[50px] object-contain" 
                />
            ))}
          </div>

          
          
        </div>
        
      </div>
      
 </div>
 <div className="h-[5px] w-full bg-(--gray-400) rounded-full mb-9" >
</div>
    </>
  );
  
};
