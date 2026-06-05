import { settingsIcon } from "../../assets";

export interface UserStatsProps {
  nickname: string;
  currentCrop: string;
  days: number;
  currentLevel: number;
  cropCount: number;
  cropProgress: number;
}

export default function MyStats({
  nickname,
  currentCrop,
  days,
  currentLevel,
  cropCount,
  cropProgress,
}: UserStatsProps) {
  let maxCropCount = 4;
  if (currentLevel === 1) maxCropCount = 2;
  if (currentLevel === 2) maxCropCount = 3;
  const levelProgressWidth = `${Math.min((cropCount / maxCropCount) * 100, 100)}%`;

  return (
    <div className="flex flex-col">
      <div
        className="flex items-center justify-center bg-(--gray-0) border-5 border-(--primary-brown)/50 w-45 h-12 rounded-[10px] z-10
      typo-body text-center !font-bold"
      >
        {nickname}
      </div>
      <div
        className="flex flex-col bg-(--primary-brown)/50 rounded-[10px] w-115 h-33 -mt-6 pt-7 px-4 pb-4
      typo-caption !font-medium justify-between relative"
      >
        {/* 현재 회원 정보 버튼 미연결 */}
        <button className="absolute right-4 top-4 cursor-pointer z-20 hover:scale-105 transition-transform">
          <img src={settingsIcon} className="w-5 h-5" alt="설정" />
        </button>
        <p>
          현재 <span className="text-(--primary-yellow)">{currentCrop}</span>
          을(를) 키우고 있어요!
        </p>
        <div className="flex w-fit items-center justify-center bg-(--gray-0)/80 rounded-[100px] h-5 px-3">
          <span>
            농부가 된 지 <span>{days}</span>일 째🌱
          </span>
        </div>

        {/* Level 프로그레스 바 */}
        <div className="w-full flex gap-6 items-center justify-between">
          <span className="shrink-0">Level {currentLevel}</span>

          <div className="w-82 h-4 bg-(--primary-brown)/20 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-(--primary-orange) to-(--primary-yellow) rounded-full transition-all duration-500 ease-out flex items-center justify-end relative"
              style={{ width: levelProgressWidth }}
            >
              {parseInt(levelProgressWidth) > 0 && (
                <span className="absolute right-2 text-[10px] text-(--gray-600) select-none whitespace-nowrap">
                  {parseInt(levelProgressWidth)}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 수확까지 프로그레스 바 */}
        <div className="w-full flex gap-6 items-center justify-between">
          <span className="shrink-0">
            <span className="text-(--primary-yellow)">{currentCrop}</span>{" "}
            수확까지
          </span>

          <div className="w-82 h-4 bg-(--primary-brown)/20 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-(--primary-orange) to-(--primary-yellow) rounded-full transition-all duration-500 ease-out flex items-center justify-end relative"
              style={{ width: `${Math.min(cropProgress, 100)}%` }}
            >
              {cropProgress > 0 && (
                <span className="absolute right-2 text-[10px] text-(--gray-600) select-none whitespace-nowrap">
                  {Math.floor(Math.min(cropProgress, 100))}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
