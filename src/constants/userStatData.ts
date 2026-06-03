export interface UserStatsProps {
  nickname: string;
  currentCrop: string;
  days: number;
  currentLevel: number;
  cropCount: number;
  cropProgress: number;
  collectedCrops?: string[];
}

// 1. 신입 농부 (1레벨, 작물: 고구마, 1레벨 최대 cropCount는 2)
export const mockNewFarmer: UserStatsProps = {
  nickname: "새내기농부🌱",
  currentCrop: "고구마",
  days: 3,
  currentLevel: 1,
  cropCount: 1, // 최대 2 중 1개 수확
  cropProgress: 35,
  collectedCrops: ["rice", "wheat"],
};

// 2. 성실한 농부 (2레벨, 작물: 쌀, 2레벨 최대 cropCount는 3)
export const mockMidFarmer: UserStatsProps = {
  nickname: "공부하는농부🌾",
  currentCrop: "바나나",
  days: 18,
  currentLevel: 2,
  cropCount: 2, // 최대 3 중 2개 수확
  cropProgress: 70,
  collectedCrops: [
    "rice",
    "wheat",
    "sweetPotato",
    "potato",
    "corn",
    "apple",
    "strawberry",
    "blueberry",
    "watermelon",
    "banana",
    "mango",
    "passionFruit",
  ],
};

// 3. 고수 농부 (3레벨, 작물: 블루베리, 3레벨 이상 최대 cropCount는 4)
export const mockHighFarmer: UserStatsProps = {
  nickname: "베테랑토마토🍅",
  currentCrop: "블루베리",
  days: 45,
  currentLevel: 3,
  cropCount: 3, // 최대 4 중 3개 수확
  cropProgress: 45,
};

// 4. 만렙 농부 (4레벨, 작물: 스타푸르트, 열대과일 테마)
export const mockMasterFarmer: UserStatsProps = {
  nickname: "팜마스터⭐",
  currentCrop: "스타푸르트",
  days: 120,
  currentLevel: 4,
  cropCount: 4, // 최대 4 중 4개 꽉 참
  cropProgress: 95, // 수확 직전 상태
};

// 5. 컴포넌트 바인딩 테스트용 배열 세트 (여러 명의 데이터를 돌려가며 테스트할 때 유용)
export const mockFarmerList: UserStatsProps[] = [
  {
    nickname: "감자조아",
    currentCrop: "감자",
    days: 5,
    currentLevel: 1,
    cropCount: 2, // 1레벨 최대치 도달
    cropProgress: 90,
  },
  {
    nickname: "애플파이",
    currentCrop: "사과",
    days: 22,
    currentLevel: 2,
    cropCount: 1,
    cropProgress: 15,
  },
  {
    nickname: "망고스틴",
    currentCrop: "망고",
    days: 60,
    currentLevel: 4,
    cropCount: 2,
    cropProgress: 50,
  },
];
