import { Link } from "react-router-dom";

interface RankingItemProps {
  id: string;
  rank: number;
  nickname: string;
  totalStudyMinutes: number;
  joinDays: number;
  avatarUrl: string;
  crops: string[];
  rawCrops?: string[];
  createdAt?: any;
  level?: number;
}

export default function RankingItem({
  id,
  rank,
  nickname,
  totalStudyMinutes,
  joinDays,
  avatarUrl,
  crops,
  rawCrops = [],
  createdAt,
  level = 1,
}: RankingItemProps) {
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
      <div
        className={`
          flex
          h-[193px]
          w-[193px]
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

      <div className="flex flex-1 flex-col items-center w-full">
        <div
          className="
            flex
            min-h-[80px]
            w-[750px]
            items-center
            rounded-t-[12px]
            bg-(--gray-0)
            px-6
            py-3
          "
        >
          <div className="flex items-center gap-3.5 w-[216px] shrink-0">
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
                <span className="typo-body2 text-(--gray-900)">일 째</span> 🌱
              </div>
            </div>
          </div>
        </div>

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
            <span className="typo-caption text-(--gray-0)">
              {nickname}님의 수확한 작물
            </span>

            {/* 🚨 [교정]: 확실한 절대경로 명시 체계(/ranking/${id})로 라우터 유실 완전 방어 */}
            <Link
              to={`/ranking/${id}`}
              state={{
                id,
                rank,
                nickname,
                totalStudyMinutes,
                createdAt,
                level,
                crops: rawCrops,
              }}
              onClick={(e) => e.stopPropagation()}
              className="
                typo-caption
                text-(--primary-brown)
                transition
                hover:text-white
                cursor-pointer
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
