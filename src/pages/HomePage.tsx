import { useState, useEffect, useRef } from "react";

import { LeftArrow, RightArrow } from "../assets/home/homeIndex";
import TimerDefault from "../components/home/TimerDefault";
import TimerRunning from "../components/home/TimerRunning";
import TimerFooter from "../components/home/TimerFooter";

export default function HomePage() {
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);
  const [timerState, setTimerState] = useState<
    "START" | "RUNNING" | "PAUSED" | "STOP"
  >("START");

  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 타이머 실행 및 정지 제어
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

  const handleReset = () => {
    setSeconds(0);
    setTimerState("START");
  };

  return (
    <div className="h-screen box-border border-t-10 border-b-10 border-(--primary-brown) overflow-hidden relative">
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

      <main className="absolute inset-0 flex justify-center items-center">
        {/* 왼쪽 배경 */}
        <div
          className={`
            w-60 h-full transition-colors duration-300
            ${hoverSide === "left" ? "bg-(--gray-0)" : ""}
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
              currentPlant="rice"
              totalProgress={20}
            />
          )}

          <TimerFooter
            timerState={timerState}
            onStart={() => setTimerState("RUNNING")}
            onPause={() => setTimerState("PAUSED")}
            onStop={() => setTimerState("STOP")}
            onReset={handleReset}
          />
        </div>

        {/* 오른쪽 배경 */}
        <div
          className={`
            w-60 h-full transition-colors duration-300
            ${hoverSide === "right" ? "bg-(--gray-0)" : ""}
          `}
        />
      </main>
    </div>
  );
}
