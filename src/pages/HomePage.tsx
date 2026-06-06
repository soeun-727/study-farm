import { useState, useEffect, useRef } from "react";

import { LeftArrow, RightArrow } from "../assets/home/homeIndex";
import TimerDefault from "../components/home/TimerDefault";
import TimerRunning from "../components/home/TimerRunning";
import TimerFooter from "../components/home/TimerFooter";

import { firebaseService } from "../api/firebaseService";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../api/firebase"; // 실제 프로젝트의 firebase설정 주소 확인

export default function HomePage() {
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);
  const [timerState, setTimerState] = useState<
    "START" | "RUNNING" | "PAUSED" | "STOP"
  >("START");

  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<string>("");

  const [currentPlant, setCurrentPlant] = useState<string>("rice");
  const [userProgress, setUserProgress] = useState<number>(0);
  const [studyTime, setStudyTime] = useState<number>(60);

  const fetchTimerData = async () => {
    try {
      const userData = await firebaseService.getCurrentUser();

      if (userData) {
        const plantId = userData.currentCrop || "rice";
        setCurrentPlant(plantId);
        setUserProgress(userData.cropProgress || 0);

        const cropRef = doc(db, "Crop Data", plantId);
        const cropSnap = await getDoc(cropRef);
        if (cropSnap.exists()) {
          setStudyTime(cropSnap.data().studyTime || 60);
        }
      }
    } catch (error) {
      console.error("타이머 데이터 로드 실패:", error);
    }
  };

  useEffect(() => {
    fetchTimerData();
  }, []);

  useEffect(() => {
    if (timerState === "RUNNING") {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerState === "STOP" || timerState === "PAUSED") {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerState]);

  const handleStart = () => {
    if (timerState === "START") {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      startTimeRef.current = `${hours}:${minutes}`;
    }
    setTimerState("RUNNING");
  };

  const handlePause = () => {
    setTimerState("PAUSED");
  };

  const handleStop = async () => {
    setTimerState("PAUSED");
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const durationMinutes = Math.floor(seconds / 60);
    if (durationMinutes < 1) {
      alert(
        "1분 미만으로 공부한 시간은 농장에 반영되지 않습니다. 이어서 조금만 더 힘내볼까요? 👨‍🌾",
      );
      return;
    }
    try {
      await firebaseService.saveStudyLog({
        startTime: startTimeRef.current,
        title: "",
        duration: durationMinutes,
        memo: "",
      });

      await fetchTimerData();
    } catch (error) {
      alert("데이터 저장에 실패했습니다. 네트워크를 확인하세요.");
    }
  };

  return (
    <div className="h-screen box-border border-t-10 border-b-10 border-(--primary-brown) overflow-hidden relative">
      {timerState === "START" && (
        <>
          {/* 왼쪽 감지 영역 */}
          <div
            className="fixed left-0 top-0 w-60 h-full z-40"
            onMouseEnter={() => setHoverSide("left")}
            onMouseLeave={() => setHoverSide(null)}
          >
            <button className="absolute left-20 top-1/2 -translate-y-1/2 w-15 transition-transform active:scale-95">
              <LeftArrow className="w-full h-auto animate-bounce-left" />
            </button>
          </div>

          {/* 오른쪽 감지 + 페이지 이동 */}
          <div
            className="fixed right-0 top-0 w-60 h-full z-40"
            onMouseEnter={() => setHoverSide("right")}
            onMouseLeave={() => setHoverSide(null)}
          >
            <button className="absolute right-20 top-1/2 -translate-y-1/2 w-15 transition-transform active:scale-95">
              <RightArrow className="w-full h-auto animate-bounce-right" />
            </button>
          </div>
        </>
      )}

      <main className="absolute inset-0 flex justify-center items-center">
        {/* 왼쪽 배경 */}
        <div
          className={`
            w-60 h-full transition-colors duration-300
            ${timerState === "START" && hoverSide === "left" ? "bg-(--gray-0)" : ""}
          `}
        />

        {/* 중앙 콘텐츠 영역 */}
        <div className="flex-1 flex flex-col items-center px-2 z-10">
          {(timerState === "START" ||
            timerState === "PAUSED" ||
            timerState === "STOP") && (
            <TimerDefault timerState={timerState} seconds={seconds} />
          )}

          {timerState === "RUNNING" && (
            <TimerRunning
              seconds={seconds}
              currentPlant={currentPlant}
              totalProgress={userProgress}
              studyTime={studyTime}
            />
          )}

          <TimerFooter
            timerState={timerState}
            onStart={handleStart}
            onPause={handlePause}
            onStop={handleStop}
          />
        </div>

        {/* 오른쪽 배경 */}
        <div
          className={`
            w-60 h-full transition-colors duration-300
            ${timerState === "START" && hoverSide === "right" ? "bg-(--gray-0)" : ""}
          `}
        />
      </main>
    </div>
  );
}
