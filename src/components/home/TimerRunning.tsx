import { useState } from "react";
import {
  pauseButton,
  pauseKorean,
  stopButton,
  stopKorean,
} from "../../assets/home/homeIndex";

interface TimerRunningProps {
  onStop: () => void;
}

export default function TimerRunning({ onStop }: TimerRunningProps) {
  const [hoveredType, setHoveredType] = useState<"pause" | "stop" | null>(null);
  const handleStopClick = () => {
    // TODO: 여기에 타이머 시간 정지 로직 추가 예정

    onStop();
  };
  return (
    <>
      <div
        className="w-40 h-20 bg-(--complementary-yellow) border-4 border-(--primary-brown) rounded-[8px] 
          typo-h1 flex items-center justify-center text-center"
      >
        01:11
      </div>
      {/* 타이머 영역 */}
      {/* 버튼 영역 */}
      <div className="flex gap-5">
        <button
          onMouseEnter={() => setHoveredType("pause")}
          onMouseLeave={() => setHoveredType(null)}
          className="active:scale-95 transition-transform shrink-0"
        >
          <img
            src={hoveredType === "pause" ? pauseKorean : pauseButton}
            className="mt-10"
            alt="일시정지 버튼"
          />
        </button>
        <button
          onMouseEnter={() => setHoveredType("stop")}
          onMouseLeave={() => setHoveredType(null)}
          onClick={handleStopClick}
          className="active:scale-95 transition-transform shrink-0"
        >
          <img
            src={hoveredType === "stop" ? stopKorean : stopButton}
            className="mt-10"
            alt="정지 버튼"
          />
        </button>
      </div>
    </>
  );
}
