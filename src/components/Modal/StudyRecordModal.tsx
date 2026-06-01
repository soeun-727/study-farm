import React from "react";
import BackButtonIcon from "../../assets/Modal/BackButton.svg";
import dots from "../../assets/Modal/threedots.svg";

interface ModalProps {
  month: number;
  day: number;
  time: string;
  studyTime: string;
  studyContent: string; //학습내용
  memo: string[];

  onClose?: () => void;
  onMenuClick?: () => void;
}

const StudyRecordModal = ({
  month,
  day,
  time,
  studyTime,
  studyContent, 
  memo,
  onClose,
  onMenuClick,
}: ModalProps) => {
  return (
    // 배경 레이어 오버레이
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F0F0F]/20">
      {/* 모달 컨테이너: 배경색을 화이트로 지정 */}
      <div className="w-[760px] h-[540px] rounded-2xl bg-(--gray-0) p-8 shadow-lg relative">

        {/* Header 영역 */}
        <div className="mb-16 flex items-center justify-between">
          <button
            onClick={onClose}
            className="cursor-pointer text-2xl text-(--gray-700)"
          >
            <img 
              src={BackButtonIcon} 
              alt="뒤로가기" 
              className="w-9 h-9" 
            />
          </button>

          {/* 타이틀: 24px 글씨 typo-h1, 주 텍스트 컬러 --gray-900 */}
          <h2 className="typo-h1 text-(--gray-900)">
            {month}월 {day}일 {time} 학습 기록
          </h2>

          <button
            onClick={onMenuClick}
            className="cursor-pointer text-2xl text-(--gray-700)"
          >
            <img 
              src={dots} 
              alt="메뉴" 
              className="w-6 h-6" 
            />
          </button>
        </div>

  {/*학습시간, 학습내용,메모 크기 가두고, 가운데 배치*/}
  <div className="w-[556px] mx-auto flex-1">
        {/* 2. 학습 시간 영역 */}
        <div className="mb-8 grid grid-cols-[100px_1fr] items-center gap-4">
          {/* 항목 라벨: typo-h2와 --gray-900 매핑 */}
          <span className="typo-h2 text-(--gray-900)">학습 시간</span>

          {/* 콘텐츠 박스: 요청하신 --primary-light-brown 배경색 및 typo-body 매핑 */}
          <div className="rounded-xl bg-(--primary-light-brown) px-5 py-3 typo-body text-(--gray-900)">
            {studyTime}
          </div>
        </div>

        {/* 3. 학습 내용 영역 */}
        <div className="mb-8 grid grid-cols-[100px_1fr] items-center gap-4">
          <span className="typo-h2 text-(--gray-900)">학습 내용</span>

          <div className="rounded-xl bg-(--primary-light-brown) px-5 py-3 typo-body text-(--gray-900)">
            {studyContent}
          </div>
        </div>

        {/* 4. 메모 영역 */}
        <div className="grid grid-cols-[100px_1fr] items-start gap-4 ">
          {/* 상단 정렬 시 박스 패딩과 라인을 맞추기 위해 pt-3 pl값 임의로 설정? 유지 */}
          <span className="pt-3 pl-10 typo-h2 text-(--gray-900) ">메모</span>

                <div className="min-h-[180px] rounded-xl bg-(--primary-light-brown) p-5">
                <textarea
                  value={memo}
                  readOnly
                  className="w-full h-full bg-transparent resize-none outline-none typo-body text-(--gray-900)"
                />
              </div>



        </div>

      </div>
    </div>
    </div>
  );
};

export default StudyRecordModal;