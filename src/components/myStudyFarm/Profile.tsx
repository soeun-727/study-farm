import { lvl2farmer } from "../../assets";
import { riceBackground } from "../../assets/cropBackground/cropBackgroundIndex";
import MyCrops from "./myCrops";
import MyStats from "./myStats";

export default function Profile() {
  return (
    <div className="flex w-230 h-85 px-5 justify-between">
      {/* 이미지 영역 */}
      <div className="flex">
        <img src={riceBackground} className="self-start w-75 rounded-[10px]" />
        <img src={lvl2farmer} className="self-end w-45 -ml-25 z-10" />
      </div>
      {/* 정보 영역 */}
      <div className="flex flex-col justify-between pb-1">
        <MyCrops />
        <MyStats />
      </div>
    </div>
  );
}
