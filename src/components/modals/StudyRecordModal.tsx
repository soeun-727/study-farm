import { useState } from "react";
import BackButtonIcon from "../../assets/Modal/BackButton.svg";
import dots from "../../assets/Modal/threedots.svg";
import Button from "../ui/Button";
import DoublecheckModal from "./DoublecheckModal";

interface ModalProps {
  month: number;
  day: number;
  time: string;
  studyTime: string;
  studyContent: string;
  memo: string[];
  onClose?: () => void;
  onDelete?: () => void;
  onSave?: (updatedContent: string, updatedMemo: string[]) => void;
}

const StudyRecordModal = ({
  month,
  day,
  time,
  studyTime,
  studyContent,
  memo,
  onClose,
  onDelete,
  onSave,
}: ModalProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [doubleCheckType, setDoubleCheckType] = useState<
    "SAVE" | "DELETE" | null
  >(null);
  // 우선 로컬 상태 관리
  const [editedContent, setEditedContent] = useState(studyContent);
  const [editedMemo, setEditedMemo] = useState(memo.join("\n"));

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleEditModeStart = () => {
    setIsEditMode(true);
    setIsMenuOpen(false);
  };

  const handleDeleteClick = () => {
    setDoubleCheckType("DELETE");
    setIsMenuOpen(false);
  };

  const handleConfirm = () => {
    if (doubleCheckType === "SAVE") {
      if (onSave) {
        const memoArray = editedMemo
          .split("\n")
          .filter((line) => line.trim() !== "");
        onSave(editedContent, memoArray);
      }
      setIsEditMode(false);
    } else if (doubleCheckType === "DELETE") {
      if (onDelete) onDelete(); // 추후 실제 삭제 로직 적용 지점
      if (onClose) onClose();
    }
    setDoubleCheckType(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F0F0F]/20">
      <div className="w-[760px] rounded-2xl bg-(--gray-0) p-8 shadow-lg relative flex flex-col justify-between">
        {/* Header 영역 */}
        <div className="flex items-center justify-between relative pb-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onClose) onClose();
            }}
            className="cursor-pointer text-2xl text-(--gray-700)"
          >
            <img src={BackButtonIcon} alt="뒤로가기" className="w-9 h-9" />
          </button>

          <h2 className="typo-h1 text-(--gray-900)">
            <span className="text-(--primary-brown)">{month}</span>월{" "}
            <span className="text-(--primary-brown)">{day}</span>일{" "}
            <span className="text-(--primary-brown)">{time}</span> 학습 기록
          </h2>

          <div className="relative">
            {!isEditMode && (
              <button
                onClick={handleMenuToggle}
                className="cursor-pointer text-2xl text-(--gray-700)"
              >
                <img src={dots} alt="메뉴" className="w-6 h-6" />
              </button>
            )}

            {isMenuOpen && (
              <div className="absolute right-0 top-8 flex flex-col items-center justify-center bg-white rounded-[10px] w-[130px] h-[72px] shadow-[0_1px_8.2px_-2px_#11111140] z-50 overflow-hidden">
                <button
                  onClick={handleEditModeStart}
                  className="w-full h-[34px] typo-caption !font-semibold hover:bg-gray-50 transition-colors text-(--gray-900)"
                >
                  수정하기
                </button>
                <div className="w-[80px] h-[0.5px] bg-[#D1D1D1]" />
                <button
                  onClick={handleDeleteClick}
                  className="w-full h-[34px] typo-caption !font-semibold hover:bg-gray-50 transition-colors text-(--gray-900)"
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 콘텐츠 영역 */}
        <div className="w-[556px] mx-auto flex-1 flex flex-col gap-6 pb-5">
          {/* 학습 시간 */}
          <div className="grid grid-cols-[100px_1fr] items-center gap-4">
            <span className="typo-h3 text-(--gray-900)">학습 시간</span>
            <div className="flex items-center h-10 rounded-[10px] bg-(--primary-light-brown) px-5 py-3 typo-body text-(--gray-900) select-none opacity-70">
              {studyTime}
            </div>
          </div>

          {/* 학습 내용 */}
          <div className="grid grid-cols-[100px_1fr] items-center gap-4">
            <span className="typo-h3 text-(--gray-900)">학습 내용</span>
            <div
              className={`flex items-center h-10 rounded-[10px] px-5 py-3 border transition-colors ${
                isEditMode
                  ? "bg-(--gray-0) border-(--gray-900)"
                  : "bg-(--primary-light-brown) border-transparent"
              }`}
            >
              {isEditMode ? (
                <input
                  type="text"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full h-full bg-transparent outline-none typo-body text-(--gray-900)"
                />
              ) : (
                <div className="typo-body text-(--gray-900)">
                  {studyContent}
                </div>
              )}
            </div>
          </div>

          {/* 메모 */}
          <div className="grid grid-cols-[100px_1fr] items-start gap-4">
            <span className="pt-1 pl-8.5 typo-h3 text-(--gray-900)">메모</span>
            <div
              className={`flex items-center h-[160px] rounded-[10px] px-5 py-3 border transition-colors ${
                isEditMode
                  ? "bg-(--gray-0) border-(--gray-900)"
                  : "bg-(--primary-light-brown) border-transparent"
              }`}
            >
              <textarea
                value={editedMemo}
                readOnly={!isEditMode}
                onChange={(e) => setEditedMemo(e.target.value)}
                className={`w-full h-full bg-transparent resize-none outline-none typo-body text-(--gray-900) ${
                  !isEditMode ? "cursor-default" : ""
                }`}
              />
            </div>
          </div>
        </div>

        {isEditMode && (
          <div className="w-full flex justify-center">
            <Button
              size="L"
              variant="black"
              onClick={() => setDoubleCheckType("SAVE")}
              className="!w-55"
            >
              수정 완료
            </Button>
          </div>
        )}
      </div>
      <DoublecheckModal
        variant={doubleCheckType === "SAVE" ? "singular" : "black"}
        isOpen={doubleCheckType !== null}
        onClose={() => setDoubleCheckType(null)}
        title={
          doubleCheckType === "SAVE"
            ? "수정이 완료되었어요"
            : `${month}월 ${day}일 ${time}`
        }
        description={
          doubleCheckType === "SAVE" ? "" : "이 학습 기록을 삭제할까요?"
        }
        onConfirm={handleConfirm}
        confirmText={doubleCheckType === "SAVE" ? "확인" : "예"}
        cancelText="아니오"
      />
    </div>
  );
};

export default StudyRecordModal;
