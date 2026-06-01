import {
  DEFAULT_BACKGROUND,
  PLANT_BACKGROUNDS,
} from "../../constants/plantAssets";

interface TimerRunningProps {
  seconds: number;
  currentPlant: string;
  totalProgress: number;
}

export default function TimerRunning({
  seconds,
  currentPlant,
  totalProgress,
}: TimerRunningProps) {
  const currentImg = PLANT_BACKGROUNDS[currentPlant] || DEFAULT_BACKGROUND;

  const radius = 112;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;

  const totalStudySeconds = totalProgress * 60 + seconds; // 분을 초로 바꾸고 타이머 초를 더함
  const maxSeconds = 100 * 60;

  const percentage = Math.min(totalStudySeconds / maxSeconds, 1);
  const strokeDashoffset = circumference - percentage * circumference;

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

      <div className="relative w-[240px] h-[240px] flex items-center justify-center mt-10">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <defs>
            <linearGradient
              id="timerGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="var(--primary-orange)" />
              <stop offset="100%" stopColor="var(--primary-yellow)" />
            </linearGradient>
          </defs>

          <circle
            cx="120"
            cy="120"
            r={radius}
            stroke="var(--gray-400)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx="120"
            cy="120"
            r={radius}
            stroke="url(#timerGradient)"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>

        <div className="rounded-full w-50 h-50 overflow-hidden z-10">
          <img
            src={currentImg}
            className="w-full h-full object-cover"
            alt={`${currentPlant} 이미지`}
          />
        </div>
      </div>
    </>
  );
}
