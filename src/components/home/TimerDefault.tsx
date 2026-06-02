import { firstFarmerTop } from "../../assets";

interface TimerDefaultProps {
  timerState: "START" | "RUNNING" | "PAUSED" | "STOP";
  seconds: number;
}

export default function TimerDefault({
  timerState,
  seconds,
}: TimerDefaultProps) {
  const pausedMinutes = Math.floor(seconds / 60);

  return (
    <>
      <img src={firstFarmerTop} className="w-50 mt-5" />
      <div
        className="w-80 h-40 bg-(--complementary-yellow) border-8 border-(--primary-brown) rounded-[15px] 
          flex flex-col items-center justify-center text-center px-4"
      >
        {timerState === "START" && (
          <p className="typo-h2">공부를 시작해볼까요?</p>
        )}
        {timerState === "PAUSED" && (
          <>
            <p className="typo-h3 !font-semibold text-(--gray-700) -mt-4 mb-3">
              잠깐 휴식!
            </p>
            <p className="typo-h2">
              지금까지{" "}
              <span className="text-(--primary-orange)">{pausedMinutes}분</span>{" "}
              공부했어요
            </p>
          </>
        )}
        {timerState === "STOP" && (
          <>
            <p className="typo-h3 !font-semibold text-(--gray-700) -mt-4 mb-3">
              공부 끝!
            </p>
            <p className="typo-h2">
              총{" "}
              <span className="text-(--primary-orange)">{pausedMinutes}분</span>{" "}
              공부했어요
            </p>
          </>
        )}
      </div>
    </>
  );
}
