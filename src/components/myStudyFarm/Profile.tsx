import MyCrops from "./MyCrops";
import MyStats from "./MyStats";

import {
  CROP_BACKGROUNDS,
  FARMER_COMPONENTS,
} from "../../constants/profileImageAssets";
import { CROP_ICONS } from "../../constants/collectedCropAssets";

import { Timestamp } from "firebase/firestore";

export interface ProfileProps {
  userStats: {
    nickname: string;
    currentCrop: string;
    createdAt: Timestamp;
    level: number;
    cropCount: number;
    cropProgress: number;
    collectedCrops?: string[];
  };
}

export default function Profile({ userStats }: ProfileProps) {
  const { currentCrop, level, collectedCrops = [], createdAt } = userStats;

  const calculateDays = () => {
    if (!createdAt || typeof createdAt.toDate !== "function") return 1;
    const createdDate = createdAt.toDate(); // Timestamp를 JS Date 객체로 변환
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const days = calculateDays();

  const selectedBackground =
    CROP_BACKGROUNDS[currentCrop] || CROP_BACKGROUNDS["쌀"];
  const FarmerComponent = FARMER_COMPONENTS[level] || FARMER_COMPONENTS[1];
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
        <MyStats
          nickname={userStats.nickname}
          currentCrop={userStats.currentCrop}
          days={days}
          currentLevel={userStats.level}
          cropCount={userStats.cropCount}
          cropProgress={userStats.cropProgress}
        />
      </div>
    </div>
  );
}
