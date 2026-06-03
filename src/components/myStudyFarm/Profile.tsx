import MyCrops from "./myCrops";
import MyStats from "./myStats";

import { mockMidFarmer } from "../../constants/userStatData";
import {
  CROP_BACKGROUNDS,
  FARMER_COMPONENTS,
} from "../../constants/profileImage";

export default function Profile() {
  //임시 데이터
  const { currentCrop, currentLevel } = mockMidFarmer;

  const selectedBackground =
    CROP_BACKGROUNDS[currentCrop] || CROP_BACKGROUNDS["쌀"];
  const FarmerComponent =
    FARMER_COMPONENTS[currentLevel] || FARMER_COMPONENTS[1];

  return (
    <div className="flex w-230 h-85 px-5 justify-between">
      {/* 이미지 영역 */}
      <div className="flex">
        <img
          src={selectedBackground}
          className="self-start w-75 rounded-[10px]"
        />
        <img src={FarmerComponent} className="self-end w-45 -ml-25 z-10" />
      </div>
      {/* 정보 영역 */}
      <div className="flex flex-col justify-between pb-1">
        <MyCrops />
        <MyStats {...mockMidFarmer} />
      </div>
    </div>
  );
}
