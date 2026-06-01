import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { leftArrow, rightArrow } from "../assets/home/homeIndex";
import TimerStart from "../components/home/TimerStart";
import TimerRunning from "../components/home/TimerRunning";
import TimerStop from "../components/home/TimerStop";

export default function HomePage() {
  const navigate = useNavigate();
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);
  const [timerState, setTimerState] = useState<"START" | "RUNNING" | "STOP">(
    "START",
  );
  return (
    <div className="h-screen box-border border-t-10 border-b-10 border-(--primary-brown) overflow-hidden relative">
      {/* 왼쪽 감지 영역 */}
      <div
        className="fixed left-0 top-0 w-60 h-full z-40"
        onMouseEnter={() => setHoverSide("left")}
        onMouseLeave={() => setHoverSide(null)}
      >
        <button className="absolute left-20 top-1/2 -translate-y-1/2 w-15 transition-transform active:scale-95">
          <img
            src={leftArrow}
            className="w-full animate-bounce-left"
            alt="이전"
          />
        </button>
      </div>

      {/* 오른쪽 감지 + 페이지 이동 */}
      <div
        className="fixed right-0 top-0 w-60 h-full z-40"
        onMouseEnter={() => setHoverSide("right")}
        onMouseLeave={() => setHoverSide(null)}
      >
        <button
          onClick={() => navigate("/mypage")}
          className="absolute right-20 top-1/2 -translate-y-1/2 w-15 transition-transform active:scale-95"
        >
          <img
            src={rightArrow}
            className="w-full animate-bounce-right"
            alt="다음"
          />
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

        {/* 중앙 */}
        <div className="flex-1 flex flex-col items-center px-2 z-10 mt-5">
          {timerState === "START" && (
            <TimerStart onStart={() => setTimerState("RUNNING")} />
          )}
          {timerState === "RUNNING" && (
            <TimerRunning onStop={() => setTimerState("STOP")} />
          )}

          {timerState === "STOP" && <TimerStop />}
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
