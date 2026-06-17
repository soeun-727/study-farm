import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  startButton,
  startKorean,
  pauseButton,
  pauseKorean,
  stopButton,
  stopKorean,
  recordKorean,
  recordButton,
} from "../../assets/home/homeIndex";

interface TimerFooterProps {
  timerState: "START" | "RUNNING" | "PAUSED" | "STOP";
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
}

export default function TimerFooter({
  timerState,
  onStart,
  onPause,
  onStop,
}: TimerFooterProps) {
  const navigate = useNavigate();
  const [isStartHovered, setIsStartHovered] = useState(false);
  const [hoveredType, setHoveredType] = useState<"pause" | "stop" | null>(null);

  return (
    <div className="mt-10">
      {timerState === "START" && (
        <button
          onMouseEnter={() => setIsStartHovered(true)}
          onMouseLeave={() => setIsStartHovered(false)}
          onClick={onStart}
          className="active:scale-95 transition-transform shrink-0 cursor-pointer"
        >
          <img
            src={isStartHovered ? startKorean : startButton}
            alt="시작 버튼"
          />
        </button>
      )}

      {timerState === "RUNNING" && (
        <div className="flex gap-5">
          <button
            onMouseEnter={() => setHoveredType("pause")}
            onMouseLeave={() => setHoveredType(null)}
            onClick={onPause}
            className="active:scale-95 transition-transform shrink-0 cursor-pointer"
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
            className="active:scale-95 transition-transform shrink-0 cursor-pointer"
          >
            <img
              src={hoveredType === "stop" ? stopKorean : stopButton}
              alt="정지 버튼"
            />
          </button>
        </div>
      )}

      {timerState === "PAUSED" && (
        <div className="flex gap-5">
          <button
            onMouseEnter={() => setIsStartHovered(true)}
            onMouseLeave={() => setIsStartHovered(false)}
            onClick={onStart}
            className="active:scale-95 transition-transform shrink-0 cursor-pointer"
          >
            <img
              src={isStartHovered ? startKorean : startButton}
              alt="시작 버튼"
            />
          </button>
          <button
            onMouseEnter={() => setHoveredType("stop")}
            onMouseLeave={() => setHoveredType(null)}
            onClick={onStop}
            className="active:scale-95 transition-transform shrink-0 cursor-pointer"
          >
            <img
              src={hoveredType === "stop" ? stopKorean : stopButton}
              alt="정지 버튼"
            />
          </button>
        </div>
      )}

      {timerState === "STOP" && (
        <button
          onMouseEnter={() => setIsStartHovered(true)}
          onMouseLeave={() => setIsStartHovered(false)}
          onClick={() => navigate("/mystudyfarm")}
          className="active:scale-95 transition-transform shrink-0 cursor-pointer"
        >
          <img
            src={isStartHovered ? recordKorean : recordButton}
            alt="시작 버튼"
          />
        </button>
      )}
    </div>
  );
}
