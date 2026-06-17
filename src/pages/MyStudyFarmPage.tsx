import { useEffect, useState } from "react";
import { LeftArrow } from "../assets/home/homeIndex";
import MyWeeklyStudies from "../components/myStudyFarm/MyWeeklyStudies";
import Profile from "../components/myStudyFarm/Profile";
import { firebaseService } from "../api/firebaseService";
import type { UserData, StudyLog } from "../constants/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function MyStudyFarmPage() {
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);

  const [userStats, setUserStats] = useState<UserData | null>(null);
  const [weeklyRecords, setWeeklyRecords] = useState<StudyLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const auth = getAuth();

  const loadWeeklyData = async () => {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      const logs = await firebaseService.getStudyLogs(uid);
      setWeeklyRecords(logs);
    } catch (error) {
      console.error("주간 기록 로드 실패:", error);
    }
  };

  useEffect(() => {
    // 🚨 Firebase Auth의 상태 상태를 관찰하는 리스너 등록
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const uid = user.uid;
          const [userData, logsData] = await Promise.all([
            firebaseService.getCurrentUser(uid),
            firebaseService.getStudyLogs(uid),
          ]);

          if (userData) {
            setUserStats(userData);
          }
          setWeeklyRecords(logsData);
        } catch (error) {
          console.error("데이터를 불러오는 중 에러가 발생했습니다:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.warn("로그인된 사용자가 없습니다.");
        setLoading(false);
      }
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 리스너 해제
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-(--primary-brown) typo-h1">
        농장 데이터를 불러오는 중입니다...
      </div>
    );
  }

  if (!userStats) {
    return (
      <div className="h-screen flex justify-center items-center text-red-500 typo-h1">
        유저 정보를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="h-screen box-border border-t-10 border-b-10 border-r-10 border-(--primary-brown) overflow-hidden relative">
      <div
        className="fixed left-0 top-0 w-60 h-full z-40"
        onMouseEnter={() => setHoverSide("left")}
        onMouseLeave={() => setHoverSide(null)}
      >
        <button className="absolute left-20 top-1/2 -translate-y-1/2 w-15 transition-transform active:scale-95">
          <LeftArrow className="w-full h-auto animate-bounce-left" />
        </button>
      </div>

      <main className="absolute inset-0 flex justify-center items-center">
        <div
          className={`
            w-60 h-full transition-colors duration-300
            ${hoverSide === "left" ? "bg-(--gray-0)" : ""}
          `}
        />

        <div className="flex-1 flex flex-col items-center px-5 gap-6 z-10">
          <Profile userStats={userStats} />
          <MyWeeklyStudies
            weeklyRecords={weeklyRecords}
            refreshData={loadWeeklyData}
          />
        </div>

        <div className="w-60 h-full" />
      </main>
    </div>
  );
}
