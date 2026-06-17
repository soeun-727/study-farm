import { useNavigate, useLocation } from "react-router-dom";
import BackButtonIcon from "../components/ui/BackButton";

interface UserDetailRouteState {
  id: string;
  rank: number;
  nickname: string;
  totalStudyMinutes: number;
  createdAt: { seconds: number; nanoseconds: number } | any;
  level: number;
  crops: string[];
}

export default function RankingDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const userDetail = (location.state as UserDetailRouteState) || {
    rank: 0,
    nickname: "익명의 농부",
    level: 1,
    createdAt: null,
    crops: [],
  };

  const topRowCells = Array.from({ length: 7 });
  const bottomRowCells = Array.from({ length: 6 });

  const getJoinDays = (createdAt: any) => {
    if (!createdAt) return 1;

    let createdDate: Date;
    if (createdAt.seconds) {
      createdDate = new Date(createdAt.seconds * 1000);
    } else {
      createdDate = new Date(createdAt);
    }

    const today = new Date();
    const diffTime = Math.abs(today.getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return "👨‍🌾";
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-(--primary-light-brown) relative flex overflow-hidden">
      <button
        onClick={handleGoBack}
        className="absolute top-8 left-0 cursor-pointer transition hover:opacity-70 scale-90"
      >
        <BackButtonIcon />
      </button>

      <div className="w-60 shrink-0 z-10" />

      <main className="flex-1 flex flex-col items-center justify-start pt-10 h-full relative">
        <h1 className="typo-h1 text-gray-900 mb-3 mt-14">농부 염탐</h1>

        <div className="flex h-[32px] min-w-[65px] items-center justify-center gap-1 rounded-full bg-(--primary-brown) px-3 my-3 typo-h3 text-(--gray-0)">
          <span>{getRankBadge(userDetail.rank)}</span>
          <span>{userDetail.rank}위</span>
        </div>

        <img
          src={`/src/assets/characters/lv${userDetail.level}farmer.svg`}
          alt="농부 아바타"
          className="h-[180px] object-contain mb-3 drop-shadow-md"
        />

        <div className="bg-white border-[3px] border-(--primary-brown)/50 text-(--gray-900) px-6 py-1 rounded-lg typo-h2 mb-3">
          {userDetail.nickname}
        </div>

        <div className="flex items-center gap-2 mb-6">
          <span className="text-(--primary-orange) typo-h2">
            Level {userDetail.level}
          </span>
          <div className="bg-white px-3 py-1 rounded-full typo-body text-gray-700 shadow-sm">
            농부가 된 지 {getJoinDays(userDetail.createdAt)}일 째 🌱
          </div>
        </div>

        <div className="bg-(--primary-brown) rounded-2xl px-6 py-5 flex flex-col gap-3 shadow-lg">
          <div className="flex justify-start gap-3 w-fit">
            {topRowCells.map((_, index) => {
              const cropId = userDetail.crops[index];
              return (
                <div
                  key={`top-${index}`}
                  className="flex items-center justify-center w-[45px] h-[45px]"
                >
                  {cropId && (
                    <img
                      src={`/src/assets/crops/${cropId}.svg`}
                      className="w-[45px] h-[45px] object-contain hover:scale-110 transition-transform"
                      alt={cropId}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-start gap-3 w-fit">
            {bottomRowCells.map((_, index) => {
              const actualIndex = index + 7;
              const cropId = userDetail.crops[actualIndex];
              return (
                <div
                  key={`bottom-${index}`}
                  className="flex items-center justify-center w-[45px] h-[45px]"
                >
                  {cropId && (
                    <img
                      src={`/src/assets/crops/${cropId}.svg`}
                      className="w-[45px] h-[45px] object-contain hover:scale-110 transition-transform"
                      alt={cropId}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <div className="w-60 shrink-0 z-10" />
    </div>
  );
}
