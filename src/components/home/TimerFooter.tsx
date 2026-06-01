import { useState } from "react";
import {
  startButton,
  startKorean,
  pauseButton,
  pauseKorean,
  stopButton,
  stopKorean,
} from "../../assets/home/homeIndex";

interface TimerFooterProps {
  timerState: "START" | "RUNNING" | "STOP";
  onStart: () => void;
  onStop: () => void;
  onReset?: () => void;
}

export default function TimerFooter({
  timerState,
  onStart,
  onStop,
  onReset,
}: TimerFooterProps) {
  const [isStartHovered, setIsStartHovered] = useState(false);
  const [hoveredType, setHoveredType] = useState<"pause" | "stop" | null>(null);

  return (
    <div className="mt-10">
      {/* --- 1) 대기 상태 (START) --- */}
      {timerState === "START" && (
        <button
          onMouseEnter={() => setIsStartHovered(true)}
          onMouseLeave={() => setIsStartHovered(false)}
          onClick={onStart}
          className="active:scale-95 transition-transform shrink-0"
        >
          <img
            src={isStartHovered ? startKorean : startButton}
            alt="시작 버튼"
          />
        </button>
      )}

      {/* --- 2) 실행 상태 (RUNNING) --- */}
      {timerState === "RUNNING" && (
        <div className="flex gap-5">
          <button
            onMouseEnter={() => setHoveredType("pause")}
            onMouseLeave={() => setHoveredType(null)}
            className="active:scale-95 transition-transform shrink-0"
          >
            <img
              src={hoveredType === "pause" ? pauseKorean : pauseButton}
              alt="일시정지 버튼"
            />
          </button>
          <button
            onMouseEnter={() => setHoveredType("stop")}
            onMouseLeave={() => setHoveredType(null)}
            onClick={onStop}
            className="active:scale-95 transition-transform shrink-0"
          >
            <img
              src={hoveredType === "stop" ? stopKorean : stopButton}
              alt="정지 버튼"
            />
          </button>
        </div>
      )}

      {/* --- 3) 정지 상태 (STOP) --- */}
      {timerState === "STOP" && (
        <button
          onClick={onReset}
          className="px-4 py-2 bg-zinc-200 text-neutral-800 rounded-lg mt-10 font-bold active:scale-95 transition-transform"
        >
          처음으로 돌아가기
        </button>
      )}
    </div>
  );
}
