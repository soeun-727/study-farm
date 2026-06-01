import { useState } from "react";

import { firstFarmerTop } from "../../assets";
import { startButton, startKorean } from "../../assets/home/homeIndex";

interface TimerStartProps {
  onStart: () => void;
}

export default function TimerStart({ onStart }: TimerStartProps) {
  const [hoverButton, setHoverButton] = useState(false);

  return (
    <>
      <img src={firstFarmerTop} className="w-50" />
      <div
        className="w-80 h-40 bg-(--complementary-yellow) border-8 border-(--primary-brown) rounded-[15px] 
          typo-h2 flex items-center justify-center text-center"
      >
        공부를 시작해볼까요?
      </div>
      <button
        onMouseEnter={() => setHoverButton(true)}
        onMouseLeave={() => setHoverButton(false)}
        onClick={onStart}
        className="active:scale-95 transition-transform shrink-0"
      >
        <img src={hoverButton ? startKorean : startButton} className="mt-10" />
      </button>
    </>
  );
}
