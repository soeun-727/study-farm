import MyCrops from "./myCrops";
import MyStats from "./myStats";

import { mockMidFarmer } from "../../constants/userStatData";
import {
  CROP_BACKGROUNDS,
  FARMER_COMPONENTS,
} from "../../constants/profileImageAssets";
import { CROP_ICONS } from "../../constants/collectedCropAssets";

export default function Profile() {
  const { currentCrop, currentLevel, collectedCrops = [] } = mockMidFarmer;

  // 1. 배경 및 농부 에셋 매핑
  const selectedBackground =
    CROP_BACKGROUNDS[currentCrop] || CROP_BACKGROUNDS["쌀"];
  const FarmerComponent =
    FARMER_COMPONENTS[currentLevel] || FARMER_COMPONENTS[1];
  const mappedCropUrls = collectedCrops
    .map((key) => CROP_ICONS[key])
    .filter(Boolean);

  return (
    <div className="flex w-230 h-85 px-5 justify-between">
      {/* 이미지 영역 */}
      <div className="flex h-full">
        <img
          src={selectedBackground}
          className="self-start w-75 rounded-[10px]"
          alt={currentCrop}
        />
        <img
          src={FarmerComponent}
          className="self-end w-45 -ml-25 z-10"
          alt="농부"
        />
      </div>

      {/* 정보 영역 */}
      <div className="flex flex-col justify-between pb-1">
        <MyCrops collectedCrops={mappedCropUrls} />
        <MyStats {...mockMidFarmer} />
      </div>
    </div>
  );
}
