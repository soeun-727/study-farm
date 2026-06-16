import { useState, useEffect, useRef } from "react";
import { LeftArrow, RightArrow } from "../assets/home/homeIndex";
import TimerDefault from "../components/home/TimerDefault";
import TimerRunning from "../components/home/TimerRunning";
import TimerFooter from "../components/home/TimerFooter";

import { firebaseService } from "../api/firebaseService";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../api/firebase";

// 작물 상수 정의
const CROP_REQUIREMENTS: Record<string, number> = {
  rice: 30,
  wheat: 60,
  sweetPotato: 90,
  potato: 120,
  corn: 150,
};
const CROP_ORDER = ["rice", "wheat", "sweetPotato", "potato", "corn"];
const CROP_NAMES: Record<string, string> = {
  rice: "쌀",
  wheat: "밀",
  sweetPotato: "고구마",
  potato: "감자",
  corn: "옥수수",
};

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
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerState]);

  useEffect(() => {
    if (timerState !== "RUNNING" || seconds === 0 || seconds % 60 !== 0) return;
    let nextProgress = userProgress + 1;
    let plant = currentPlant;
    let currentStudyTime = studyTime;
    let isHarvested = false;

    while (nextProgress >= currentStudyTime) {
      nextProgress -= currentStudyTime;
      isHarvested = true;

      console.log(`🎉 ${CROP_NAMES[plant]} 수확 완료!`);
      alert(`🎉 ${CROP_NAMES[plant]} 수확 완료!`);

      const currentIndex = CROP_ORDER.indexOf(plant);
      const nextIndex = (currentIndex + 1) % CROP_ORDER.length;
      plant = CROP_ORDER[nextIndex];
      currentStudyTime = CROP_REQUIREMENTS[plant] || 60;
    }

    if (isHarvested) {
      setUserProgress(nextProgress);
      setCurrentPlant(plant);
      setStudyTime(currentStudyTime);
    } else {
      setUserProgress(nextProgress);
    }
  }, [seconds, timerState]);

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
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const durationMinutes = Math.floor(seconds / 60);
    if (durationMinutes < 1) {
      setTimerState("PAUSED");
      alert(
        "1분 미만으로 공부한 시간은 농장에 반영되지 않습니다. 이어서 조금만 더 힘내볼까요? 👨‍🌾",
      );
      return;
    }

    setTimerState("STOP");

    try {
      await firebaseService.saveStudyLog({
        startTime: startTimeRef.current,
        title: "",
        duration: durationMinutes,
        memo: "",
        currentCrop: currentPlant,
        cropProgress: userProgress,
      });

      setSeconds(0);
      setTimerState("START");
      await fetchTimerData();
    } catch (error) {
      alert("데이터 저장에 실패했습니다. 네트워크를 확인하세요.");
      setTimerState("PAUSED");
    }
  };

  return (
    <div className="h-screen box-border border-t-10 border-b-10 border-(--primary-brown) overflow-hidden relative">
      {timerState === "START" && (
        <>
          <div
            className="fixed left-0 top-0 w-60 h-full z-40"
            onMouseEnter={() => setHoverSide("left")}
            onMouseLeave={() => setHoverSide(null)}
          >
            <button className="absolute left-20 top-1/2 -translate-y-1/2 w-15 transition-transform active:scale-95">
              <LeftArrow className="w-full h-auto animate-bounce-left" />
            </button>
          </div>

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
        <div
          className={`
            w-60 h-full transition-colors duration-300
            ${timerState === "START" && hoverSide === "left" ? "bg-(--gray-0)" : ""}
          `}
        />

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
