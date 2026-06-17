import { useEffect, useState } from "react";
import RankingItem from "../components/rank/RankingItem";
import { RightArrow } from "../assets/home/homeIndex";
import { useNavigate } from "react-router-dom";
import { firebaseService } from "../api/firebaseService";
import { CROP_ICONS } from "../constants/collectedCropAssets";

interface FirebaseUser {
  id: string;
  rank: number;
  nickname: string;
  totalStudyMinutes: number;
  createdAt: any;
  level: number;
  crops: string[];
}

interface RankingData {
  id: string;
  rank: number;
  nickname: string;
  totalStudyMinutes: number;
  joinDays: number;
  avatarUrl: string;
  crops: string[];
  rawCrops: string[];
  createdAt: any;
  level: number;
}

export default function RankPage() {
  const [rankingData, setRankingData] = useState<RankingData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        setIsLoading(true);
        const rawRankingList = await firebaseService.getRankingList();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const formattedData = (rawRankingList as FirebaseUser[]).map((user) => {
          let joinDays = 1;

          if (user.createdAt) {
            let createdDate: Date | null = null;

            // 🚨 [핵심 교정]: 타입별 완벽 예외 방어 파싱 체계 구축
            if (typeof user.createdAt.toDate === "function") {
              createdDate = user.createdAt.toDate();
            } else if (user.createdAt.seconds) {
              createdDate = new Date(user.createdAt.seconds * 1000);
            } else if (user.createdAt._seconds) {
              createdDate = new Date(user.createdAt._seconds * 1000);
            } else if (
              typeof user.createdAt === "string" ||
              typeof user.createdAt === "number"
            ) {
              createdDate = new Date(user.createdAt);
            }

            // 올바른 Date 객체 생성이 완료되었고 NaN이 아닐 때만 차이 계산
            if (createdDate && !isNaN(createdDate.getTime())) {
              createdDate.setHours(0, 0, 0, 0);

              const diffTime = today.getTime() - createdDate.getTime();
              const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

              joinDays = diffDays > 0 ? diffDays : 1;
            }
          }

          const validLevel =
            user.level >= 1 && user.level <= 4 ? user.level : 1;
          const avatarUrl = `src/assets/characters/lv${validLevel}farmer.svg`;

          const mappedCrops = (user.crops || [])
            .map(
              (cropName: string) =>
                CROP_ICONS[cropName as keyof typeof CROP_ICONS] || "",
            )
            .filter((icon: string) => icon !== "");

          return {
            id: user.id,
            rank: user.rank,
            nickname: user.nickname,
            totalStudyMinutes: user.totalStudyMinutes,
            joinDays: joinDays,
            avatarUrl: avatarUrl,
            crops: mappedCrops,
            rawCrops: user.crops || [],
            createdAt: user.createdAt,
            level: validLevel,
          };
        });

        setRankingData(formattedData);
      } catch (error) {
        console.error("랭킹 화면 로딩 오류:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRanking();
  }, []);

  const handleGoBack = () => {
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-(--primary-light-brown) flex items-center justify-center text-xl font-bold">
        농부들의 기록을 불러오는 중...🌾
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-(--primary-light-brown) box-border border-t-10 border-b-10 border-l-10 border-(--primary-brown) flex relative overflow-hidden">
      <div className="w-60 shrink-0 transition-colors duration-300 z-10" />

      <main className="flex-1 flex flex-col items-center pt-15 h-full">
        <h1 className="text-(--gray-900) mb-15 typo-h1 shrink-0">
          열공농장 농부 랭킹
        </h1>

        <div className="w-full max-w-[1320px] px-5 flex flex-col mx-auto flex-1 overflow-y-auto pb-15 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {rankingData.map((item, index) => (
            <div key={item.id} className="w-full flex flex-col items-center">
              <div className="w-full">
                <RankingItem
                  id={item.id}
                  rank={item.rank}
                  nickname={item.nickname}
                  totalStudyMinutes={item.totalStudyMinutes}
                  joinDays={item.joinDays}
                  avatarUrl={item.avatarUrl}
                  crops={item.crops}
                  rawCrops={item.rawCrops}
                  createdAt={item.createdAt}
                  level={item.level}
                />
              </div>

              {index !== rankingData.length - 1 && (
                <div className="w-full h-[2px] bg-(--gray-400) rounded-full mb-7" />
              )}
            </div>
          ))}

          {rankingData.length === 0 && (
            <div className="text-center text-gray-500 mt-20">
              아직 등록된 농부가 없습니다.
            </div>
          )}
        </div>
      </main>

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
