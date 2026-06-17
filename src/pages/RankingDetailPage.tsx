import { useLocation } from "react-router-dom";
import { CROP_ICONS } from "../constants/collectedCropAssets";
import BackButton from "../components/ui/BackButton";
import { FARMER_COMPONENTS } from "../constants/profileImageAssets";

interface UserDetailRouteState {
  id: string;
  rank: number;
  nickname: string;
  totalStudyMinutes: number;
  createdAt: any;
  level: number;
  crops: string[];
}

export default function RankingDetailPage() {
  const location = useLocation();
  const stateData = location.state as UserDetailRouteState | null;

  const userDetail = {
    id: stateData?.id || "",
    rank: stateData?.rank || 0,
    nickname: stateData?.nickname || "익명의 농부",
    level: stateData?.level || 1,
    createdAt: stateData?.createdAt || null,
    crops: stateData?.crops || [],
  };

  const topRowCells = Array.from({ length: 7 });
  const bottomRowCells = Array.from({ length: 6 });

  const getJoinDays = (createdAt: any) => {
    if (!createdAt) return 1;

    let createdDate: Date | null = null;

    if (typeof createdAt.toDate === "function") {
      createdDate = createdAt.toDate();
    } else if (createdAt.seconds) {
      createdDate = new Date(createdAt.seconds * 1000);
    } else if (createdAt._seconds) {
      createdDate = new Date(createdAt._seconds * 1000);
    } else if (typeof createdAt === "string" || typeof createdAt === "number") {
      createdDate = new Date(createdAt);
    }

    if (createdDate && !isNaN(createdDate.getTime())) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      createdDate.setHours(0, 0, 0, 0);

      const diffTime = today.getTime() - createdDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays > 0 ? diffDays : 1;
    }

    return 1;
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return "👨‍🌾";
  };

  const avatarUrl = FARMER_COMPONENTS[userDetail.level] || FARMER_COMPONENTS[1];

  return (
    <div className="min-h-screen bg-(--primary-light-brown) relative flex overflow-hidden">
      <BackButton />

      <div className="w-60 shrink-0 z-10" />

      <main className="flex-1 flex flex-col items-center justify-start pt-10 h-full relative">
        <h1 className="typo-h1 text-gray-900 mb-3 mt-14">농부 염탐</h1>

        <div className="flex h-[32px] min-w-[65px] items-center justify-center gap-1 rounded-full bg-(--primary-brown) px-3 my-3 typo-h3 text-(--gray-0)">
          <span>{getRankBadge(userDetail.rank)}</span>
          <span>{userDetail.rank}위</span>
        </div>

        <img
          src={avatarUrl}
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
              const cropImgSrc = CROP_ICONS[cropId as keyof typeof CROP_ICONS];

              return (
                <div
                  key={`top-${index}`}
                  className="flex items-center justify-center w-[45px] h-[45px]"
                >
                  {cropImgSrc && (
                    <img
                      src={cropImgSrc}
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
              const cropImgSrc = CROP_ICONS[cropId as keyof typeof CROP_ICONS];

              return (
                <div
                  key={`bottom-${index}`}
                  className="flex items-center justify-center w-[45px] h-[45px]"
                >
                  {cropImgSrc && (
                    <img
                      src={cropImgSrc}
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
