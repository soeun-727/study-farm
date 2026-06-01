import { firstFarmerTop } from "../../assets";

export default function TimerStart() {
  return (
    <>
      <img src={firstFarmerTop} className="w-50" />
      <div
        className="w-80 h-40 bg-(--complementary-yellow) border-8 border-(--primary-brown) rounded-[15px] 
          typo-h2 flex items-center justify-center text-center"
      >
        공부를 시작해볼까요?
      </div>
    </>
  );
}
