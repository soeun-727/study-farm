import { useEffect, useState } from "react";
import RankingItem from "../components/rank/RankingItem";
import { RightArrow } from "../assets/home/homeIndex";
import { useNavigate } from "react-router-dom";

import { db } from "../api/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

// Firestore에서 가져오는 원본 데이터 구조
interface FirebaseUser {
  id: string;
  nickname: string;
  totalStudyMinutes: number;
  createdAt: any;
  level: number;
  crops: string[];
}

// 2. [수정] 컴포넌트 내 state에서 사용할 변환된 데이터 구조 정의
interface RankingData {
  id: string;
  rank: number;
  nickname: string;
  totalStudyMinutes: number;
  joinDays: number;
  avatarUrl: string;
  crops: string[];
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

        // 1. users 컬렉션에서 totalStudyMinutes 내림차순 정렬 쿼리 생성
        const usersRef = collection(db, "users");
        const q = query(usersRef, orderBy("totalStudyMinutes", "desc"));
        const querySnapshot = await getDocs(q);

        const now = new Date();
        const loadedData: RankingData[] = [];
        let currentRank = 1;

        querySnapshot.forEach((doc) => {
          const data = doc.data() as FirebaseUser;

          // 2. 가입일(joinDays) 계산 로직 (Timestamp 기준)
          let joinDays = 1;
          if (data.createdAt) {
            const createdDate = data.createdAt.toDate
              ? data.createdAt.toDate()
              : new Date(data.createdAt);
            const diffTime = Math.abs(now.getTime() - createdDate.getTime());
            joinDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          }

          // 3. 유저 레벨에 따른 아바타 이미지 경로 동적 매핑
          const validLevel =
            data.level >= 1 && data.level <= 4 ? data.level : 1;
          const avatarUrl = `src/assets/characters/lv${validLevel}farmer.svg`;

          loadedData.push({
            id: doc.id,
            rank: currentRank++,
            nickname: data.nickname || "익명의 농부",
            totalStudyMinutes: data.totalStudyMinutes || 0,
            joinDays: joinDays,
            avatarUrl: avatarUrl,
            crops: data.crops || [],
          });
        });

        setRankingData(loadedData);
      } catch (error) {
        console.error("Firestore 랭킹 로딩 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRanking();
  }, []);

  const handleGoBack = () => {
    console.log("이전 페이지로 이동!");
    navigate("/");
  };

  // 3. [추가] 로딩 중일 때 스피너나 대체 텍스트 노출
  if (isLoading) {
    return (
      <div className="h-screen w-full bg-(--primary-light-brown) flex items-center justify-center text-xl font-bold">
        농부들의 기록을 불러오는 중...🌾
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-(--primary-light-brown) box-border border-t-10 border-b-10 border-l-10 border-(--primary-brown) flex relative overflow-hidden">
      {/* 왼쪽 영역 */}
      <div className="w-60 shrink-0 transition-colors duration-300 z-10" />

      {/* 중앙 메인 콘텐츠 */}
      <main className="flex-1 flex flex-col items-center pt-15 h-full">
        <h1 className="text-(--gray-900) mb-15 typo-h1 shrink-0">
          열공농장 농부 랭킹
        </h1>

        {/* 스크롤 영역 */}
        <div className="w-full max-w-[1320px] px-5 flex flex-col mx-auto flex-1 overflow-y-auto pb-15 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* 1. [수정] DUMMY_RANKING_DATA 대신 실제 백엔드에서 온 rankingData 사용 */}
          {rankingData.map((item, index) => (
            <div key={item.id} className="w-full flex flex-col items-center">
              <RankingItem
                rank={item.rank}
                nickname={item.nickname}
                totalStudyMinutes={item.totalStudyMinutes}
                joinDays={item.joinDays}
                avatarUrl={item.avatarUrl}
                crops={item.crops}
              />

              {index !== rankingData.length - 1 && (
                <div className="w-full h-[2px] bg-(--gray-400) rounded-full mb-7" />
              )}
            </div>
          ))}

          {/* 농부가 아무도 없을 때 예외 처리 */}
          {rankingData.length === 0 && (
            <div className="text-center text-gray-500 mt-20">
              아직 등록된 농부가 없습니다.
            </div>
          )}
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
