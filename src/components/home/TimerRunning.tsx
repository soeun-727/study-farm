interface TimerRunningProps {
  seconds: number;
}

export default function TimerRunning({ seconds }: TimerRunningProps) {
  // 시간 포맷터 함수
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const formattedMins = String(mins).padStart(2, "0");
    const formattedSecs = String(secs).padStart(2, "0");

    if (hours === 0) {
      return `${formattedMins}:${formattedSecs}`;
    }
    const formattedHours = String(hours).padStart(2, "0");
    return `${formattedHours}:${formattedMins}:${formattedSecs}`;
  };

  return (
    <>
      <div
        className="w-50 h-20 px-6 bg-(--complementary-yellow) border-4 border-(--primary-brown) rounded-[8px] 
          typo-h1 flex items-center justify-center text-center"
      >
        {formatTime(seconds)}
      </div>
    </>
  );
}
