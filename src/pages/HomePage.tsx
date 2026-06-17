import { useState, useEffect, useRef } from "react";
import { LeftArrow, RightArrow } from "../assets/home/homeIndex";
import TimerDefault from "../components/home/TimerDefault";
import TimerRunning from "../components/home/TimerRunning";
import TimerFooter from "../components/home/TimerFooter";
import { firebaseService } from "../api/firebaseService";
import { getAuth } from "firebase/auth";

interface CropScheme {
  id: string;
  name: string;
  studyTime: number;
}

const CROP_SCHEME: CropScheme[] = [
  { id: "rice", name: "쌀", studyTime: 60 },
  { id: "wheat", name: "밀", studyTime: 60 },
  { id: "potato", name: "감자", studyTime: 120 },
  { id: "sweetpotato", name: "고구마", studyTime: 120 },
  { id: "corn", name: "옥수수", studyTime: 120 },
  { id: "apple", name: "사과", studyTime: 180 },
  { id: "strawberry", name: "딸기", studyTime: 180 },
  { id: "blueberry", name: "블루베리", studyTime: 180 },
  { id: "watermelon", name: "수박", studyTime: 180 },
  { id: "banana", name: "바나나", studyTime: 240 },
  { id: "mango", name: "망고", studyTime: 240 },
  { id: "passionfruit", name: "패션후르츠", studyTime: 240 },
  { id: "starfruit", name: "starfruit", studyTime: 240 },
];

const LEVEL_THRESHOLDS: Record<number, number> = { 1: 2, 2: 3, 3: 4, 4: 4 };

export default function HomePage() {
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);
  const [timerState, setTimerState] = useState<
    "START" | "RUNNING" | "PAUSED" | "STOP"
  >("START");

  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<string>("");
  const currentMinuteRef = useRef<number>(0);

  const levelRef = useRef<number>(1);
  const cropCountRef = useRef<number>(0);

  const [currentPlant, setCurrentPlant] = useState<string>("rice");
  const [userProgress, setUserProgress] = useState<number>(0);
  const [studyTime, setStudyTime] = useState<number>(60);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [cropCount, setCropCount] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const auth = getAuth();

  const fetchTimerData = async () => {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) {
        console.warn("로그인된 사용자가 없습니다.");
        return;
      }

      const userData = await firebaseService.getCurrentUser(uid);
      if (userData) {
        const plantId = userData.currentCrop || "rice";
        setCurrentPlant(plantId);
        setUserProgress(userData.cropProgress || 0);

        setCropCount(userData.cropCount || 0);
        setLevel(userData.level || 1);
        cropCountRef.current = userData.cropCount || 0;
        levelRef.current = userData.level || 1;

        const currentCropData = CROP_SCHEME.find((c) => c.id === plantId);
        setStudyTime(currentCropData ? currentCropData.studyTime : 60);
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
      currentMinuteRef.current = 0;
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerState]);

  useEffect(() => {
    if (timerState !== "RUNNING" || seconds === 0 || seconds % 60 !== 0) return;

    const totalMinutesElapsed = Math.floor(seconds / 60);
    if (totalMinutesElapsed <= currentMinuteRef.current) return;
    currentMinuteRef.current = totalMinutesElapsed;

    let nextProgress = userProgress + 1;
    let plant = currentPlant;
    let currentCropCount = cropCount;
    let currentLevel = level;
    let isHarvested = false;
    let lastHarvestedName = "";

    let currentIndex = CROP_SCHEME.findIndex((c) => c.id === plant);
    let currentCropObj = CROP_SCHEME[currentIndex >= 0 ? currentIndex : 0];
    let currentStudyTime = currentCropObj.studyTime;

    while (nextProgress >= currentStudyTime) {
      nextProgress -= currentStudyTime;
      isHarvested = true;
      lastHarvestedName = currentCropObj.name;

      currentCropCount += 1;

      const requiredCrops = LEVEL_THRESHOLDS[currentLevel] || 0;
      if (currentCropCount >= requiredCrops && currentLevel < 4) {
        currentLevel += 1;
        currentCropCount = 0;
      }

      const nextIndex =
        (CROP_SCHEME.findIndex((c) => c.id === currentCropObj.id) + 1) %
        CROP_SCHEME.length;
      currentCropObj = CROP_SCHEME[nextIndex];
      plant = currentCropObj.id;
      currentStudyTime = currentCropObj.studyTime;
    }

    if (isHarvested) {
      setUserProgress(nextProgress);
      setCurrentPlant(plant);
      setStudyTime(currentStudyTime);
      setCropCount(currentCropCount);
      setLevel(currentLevel);

      cropCountRef.current = currentCropCount;
      levelRef.current = currentLevel;

      setToastMessage(
        `🎉 [${lastHarvestedName}] 수확 완료! 다음 작물 성장을 시작합니다. 👨‍🌾`,
      );
      setTimeout(() => {
        setToastMessage(null);
      }, 3000);
    } else {
      setUserProgress(nextProgress);
    }
  }, [
    seconds,
    timerState,
    currentPlant,
    studyTime,
    userProgress,
    cropCount,
    level,
  ]);

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
    const uid = auth.currentUser?.uid;
    if (!uid) {
      alert("로그인 세션이 만료되었습니다. 다시 로그인해 주세요.");
      setTimerState("PAUSED");
      return;
    }

    setTimerState("STOP");

    try {
      await firebaseService.saveStudyLog(uid, {
        startTime: startTimeRef.current,
        title: "",
        duration: durationMinutes,
        memo: "",
        currentCrop: currentPlant,
        cropProgress: userProgress,
        level: levelRef.current,
        cropCount: cropCountRef.current,
      });

      setSeconds(0);
      currentMinuteRef.current = 0;
      setTimerState("START");
      await fetchTimerData();
    } catch (error) {
      alert("데이터 저장에 실패했습니다. 네트워크를 확인하세요.");
      setTimerState("PAUSED");
    }
  };

  return (
    <div className="h-screen box-border border-t-10 border-b-10 border-(--primary-brown) overflow-hidden relative">
      {toastMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-black/80 text-white px-6 py-3 rounded-xl shadow-lg font-bold animate-bounce typo-body1 flex items-center gap-2">
          {toastMessage}
        </div>
      )}

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
