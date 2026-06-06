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
        return { icon: "", bg: "bg-(--primary-brown)/50" };
    }
  };

  const badge = getRankBadge(rank);

  return (
    <div className="flex items-center gap-7 pb-7 w-full">
      
      {/* 프로필 카드 (120% 스케일업, 하단 rounded 제거) */}
      <div
        className={`
          flex
          h-[156px]
          w-[156px]
          shrink-0
          items-center
          justify-center
          rounded-lg
          border-[5px]
          ${getRankBorderStyle(rank)}
        `}
      >
        <div className="flex h-full w-full items-center justify-center rounded-t-[8px] bg-(--gray-0)">
          <img
            src={avatarUrl}
            alt={nickname}
            className="h-full w-full object-contain p-2.5"
          />
        </div>
      </div>

      {/* 정보 카드 전체 묶음 */}
      <div className="flex flex-1 flex-col items-center w-full">
        
        {/* 상단 카드 (120% 스케일업, 하단 rounded 제거) */}
        <div
          className="
            flex
            min-h-[91px]
            w-[750px]
            items-center
            rounded-t-[12px]
            bg-(--gray-0)
            px-6
            py-3
          "
        >
          {/* 고정된 닉네임 영역 (너비 216px 고정으로 세로선 위치 절대 고정) */}
          <div className="flex items-center gap-3.5 w-[216px] shrink-0">
            {/* 순위 뱃지 (120% 스케일업) */}
            <div
              className={`
                flex
                h-[31px]
                min-w-[54px]
                items-center
                justify-center
                gap-1
                rounded-full
                ${badge.bg}
                px-3
                typo-label
                text-(--gray-0)
              `}
            >
              <span>{badge.icon}</span>
              <span>{rank}위</span>
            </div>

            {/* 닉네임 */}
            <div className="flex items-center typo-body truncate text-(--gray-900)">
              <span className="text-(--primary-brown) typo-body2 truncate max-w-[114px]">
                {nickname}
              </span>
              <span className="typo-body2 text-(--gray-900)">님</span>
            </div>
          </div>

          <div className="h-[48px] w-[2px] bg-(--gray-400) shrink-0 mx-5 rounded-full" />

          <div className="typo-body2 text-(--gray-800) flex-1 flex flex-col items-start justify-center gap-1">
            <div className="flex items-center">
            <div className="text-left">
              총 공부 시간{" "}
              <span className="text-(--primary-orange) typo-body2 ">
                {totalStudyMinutes.toLocaleString()}
              </span>
              <span className="typo-body2 text-(--gray-900) mr-2">분!</span>
            </div>
            <div className="text-left">
              농부가 된 지{" "}
              <span className="text-(--primary-orange) typo-body2">
                {joinDays}
              </span>
              <span className="typo-body2 text-(--gray-900)">일 째</span>{" "}
              🌱
            </div>
          </div>
          </div>
        </div>

              {/* 하단 카드 */}
        <div
          className="
            relative
            flex
            w-full
            max-w-[770px]
            rounded-[12px]
            flex-col
            justify-center
            bg-(--primary-brown)/50
            px-6
            py-4
            gap-3
          "
        >    
          <div className="flex items-center justify-between w-full">              
            {/* 작물 카드 타이틀 */}
            <span className="typo-caption text-(--gray-0)">
              {nickname}님의 수확한 작물
            </span>

            {/* 전체보기 버튼 */}
            <Link
              to="../pages/RankDetail" 
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

           <div className="flex w-full py-1 justify-start gap-2">
            {Array.from({ length: 13 }).map((_, index) => {
              const imgSrc = crops[index];
              return (
                <div
                  key={`crop-${index}`}
                  className="flex items-center justify-center w-[45px] h-[45px]"
                >
                  {imgSrc && (
                    <img
                      src={imgSrc}
                      className="w-[45px] h-[45px] object-contain"
                      alt="수확된 작물"
                    />
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}