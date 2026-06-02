import { useState } from "react";
import { LeftArrow } from "../assets/home/homeIndex";
import MyWeeklyStudies from "../components/myStudyFarm/myWeeklyStudies";
import Profile from "../components/myStudyFarm/Profile";

export default function MyStudyFarmPage() {
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);

  return (
    <div className="h-screen box-border border-t-10 border-b-10 border-r-10 border-(--primary-brown) overflow-hidden">
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
      <main className="absolute inset-0 flex justify-center items-center">
        {/* 왼쪽 배경 */}
        <div
          className={`
            w-60 h-full transition-colors duration-300
            ${hoverSide === "left" ? "bg-(--gray-0)" : ""}
          `}
        />

        {/* 중앙 콘텐츠 영역 */}
        <div className="flex-1 flex flex-col items-center px-5 gap-6 z-10">
          <Profile />
          <MyWeeklyStudies />
        </div>
        {/* 오른쪽 배경 */}
        <div className="w-60 h-full" />
      </main>
    </div>
  );
}
