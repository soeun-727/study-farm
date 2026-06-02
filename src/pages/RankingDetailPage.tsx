import { useNavigate } from "react-router-dom";
import BackButtonIcon from "../assets/Modal/BackButton.svg";


// 임시 더미 데이터)
const USER_DETAIL_DATA = {
  id: 1,
  rank: 1,
  nickname: "공부하는농부",
  level: 1,
  badge: "🥇",
  joinDays: 365,
  avatarUrl: "/src/assets/characters/lv1farmer.svg",
  crops: [
    "/src/assets/crops/rice.svg",
    "/src/assets/crops/potato.svg",
    "/src/assets/crops/corn.svg",
    "/src/assets/crops/blueberry.svg",
    "/src/assets/crops/banana.svg",
    "/src/assets/crops/mango.svg",
    "/src/assets/crops/watermelon.svg",
    "/src/assets/crops/mango.svg",
    "/src/assets/crops/watermelon.svg",
  ],
};

export default function RankingDetailPage() {
  const navigate = useNavigate();

  // 뒤로가기 
  const handleGoBack = () => {
    navigate('/'); 
  };

  return (
    <>
    <div className="min-h-screen bg-(--primary-light-brown) relative flex flex-col items-center py-[30px] ">

      {/* 상단 뒤로가기 버튼 */}
      <button
      onClick={handleGoBack}
      className="absolute top-10 left-10 cursor-pointer transition hover:opacity-70">
      <img src={BackButtonIcon} alt="뒤로가기" className="w-9 h-9" />
    </button>


      {/* 타이틀 */}
      <h1 className="text-xl typo-h1 text-gray-900 mb-6  mt-30">
        농부 염탐
      </h1>

      {/* 순위 뱃지 */}
      <div
              className={`
                flex
                h-[55px]
                min-w-[95px]
                items-center
                justify-center
                gap-1
                rounded-full
                bg-(--primary-brown)
                px-5
                my-5
                typo-h3
                text-(--gray-0)
              `}
            >
              <span>{USER_DETAIL_DATA.badge}</span>
              <span>{USER_DETAIL_DATA.rank}위</span>
            </div>

      {/* 중앙 아바타 이미지 */}
      <img
        src={USER_DETAIL_DATA.avatarUrl}
        alt="농부 아바타"
        className="h-[350px] object-contain mb-4 drop-shadow-md iteams-center justify-center "
      />

      {/* 닉네임 박스 */}
      <div className="bg-white border-[5px] border-(--primary-brown)/50 text-(--gray-900) px-12 py-2 rounded-lg typo-h2 mb-4">
        {USER_DETAIL_DATA.nickname}
      </div>

      {/* 레벨 및 가입일 정보 */}
      <div className="flex items-center gap-4 mb-10">
        <span className="text-(--primary-orange)  typo-h2 ">
          Level {USER_DETAIL_DATA.level}
        </span>
        <div className="bg-white px-4 py-1.5 rounded-full typo-body text-gray-700 shadow-sm">
          농부가 된 지 {USER_DETAIL_DATA.joinDays}일 째 🌱
        </div>
      </div>

      {/* 수확한 작물 인벤토리 */}
      <div className="w-full max-w-[820px] min-h-[200px] bg-(--primary-brown) rounded-xl p-8 flex flex-wrap gap-8 content-start">
        {USER_DETAIL_DATA.crops.map((crop, index) => (
          <img
            key={index}
            src={crop}
            alt={`crop-${index}`}
            className="w-[80px] h-[80px] object-contain drop-shadow-lg hover:scale-110 transition-transform cursor-pointer"
          />
        ))}
      </div>
    </div>
    </>
  );
  
}