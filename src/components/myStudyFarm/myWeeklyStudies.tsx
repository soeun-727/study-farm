import { useEffect, useState } from "react";
import StudyRecordModal from "../modals/StudyRecordModal"; // 🚀 모달 임포트 (프로젝트 경로에 맞게 조정 필요)

export interface StudyRecord {
  startTime: string;
  content?: string;
  studyTime?: string;
  memo?: string[];
}

export type WeeklyRecords = Record<string, StudyRecord[]>;

interface MyWeeklyStudiesProps {
  weeklyRecords?: WeeklyRecords;
}

interface SelectedModalData extends StudyRecord {
  dayName: string;
}

export default function MyWeeklyStudies({
  weeklyRecords = {},
}: MyWeeklyStudiesProps) {
  const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
  const [currentMonth, setCurrentMonth] = useState<number>(0);
  const [currentWeek, setCurrentWeek] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] =
    useState<SelectedModalData | null>(null);

  useEffect(() => {
    const getMonthAndWeek = (date: Date) => {
      const currentDate = new Date(date.getTime());
      const dayNum = (date.getDay() + 6) % 7;
      currentDate.setDate(currentDate.getDate() - dayNum + 3);
      const month = currentDate.getMonth() + 1;
      const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1,
      );
      const firstDayOfWeek = firstDayOfMonth.getDay();
      const firstThursday =
        firstDayOfWeek <= 4 ? 5 - firstDayOfWeek : 12 - firstDayOfWeek;
      const firstThursdayDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        firstThursday,
      );
      const week =
        Math.floor(
          (currentDate.getTime() - firstThursdayDate.getTime()) /
            (7 * 24 * 60 * 60 * 1000),
        ) + 1;
      return { month, week };
    };
    const { month, week } = getMonthAndWeek(new Date());
    setCurrentMonth(month);
    setCurrentWeek(week);
  }, []);

  const handleRecordClick = (dayName: string, record: StudyRecord) => {
    setSelectedRecord({ ...record, dayName });
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col w-230 h-70 bg-(--primary-brown)/50 rounded-[15px] p-4 gap-4">
      {/* 헤더 영역 */}
      <div className="relative flex items-end justify-center w-full">
        {/* 추후 캘린더 연결 */}
        <button className="absolute left-0 typo-caption text-(--gray-0) cursor-pointer">
          전체 학습 내역 &gt;
        </button>
        <p className="typo-body !font-semibold text-center">
          {currentMonth}월 {currentWeek}주차 학습 내역
        </p>
      </div>

      {/* 요일 영역 */}
      <div className="flex justify-between items-center w-full h-full gap-2 overflow-hidden">
        {DAYS.map((day, index) => {
          const dayRecords = weeklyRecords[day] || [];
          return (
            <div
              key={index}
              className="flex flex-col items-start justify-start py-4 px-1 w-28 h-full bg-(--gray-0) rounded-[25px] shadow-sm overflow-hidden"
            >
              <span
                className={`typo-body2 !font-bold px-2 shrink-0 ${
                  day === "일" || day === "토" ? "text-(--primary-brown)" : ""
                }`}
              >
                {day}
              </span>

              {/* 공부 기록 영역 */}
              <div className="flex flex-col w-full h-full gap-1 pt-2 overflow-hidden">
                {dayRecords.map((record, rIndex) => (
                  <button
                    key={`${day}-${rIndex}`}
                    onClick={() => handleRecordClick(day, record)}
                    className="w-full text-left flex-1 max-h-10 min-h-0 flex flex-col"
                  >
                    <div className="flex gap-1 items-start bg-(--primary-yellow) h-full w-full px-1 typo-body2 flex-1 min-h-0">
                      <span className="font-semibold shrink-0">
                        {record.startTime.split(":")[0]}시
                      </span>
                      {record.content && record.content.trim() !== "" && (
                        <span className="font-normal truncate">
                          {record.content}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && selectedRecord && (
        <StudyRecordModal
          month={currentMonth}
          day={15}
          time={`${selectedRecord.startTime.split(":")[0]}시`}
          studyTime={selectedRecord.studyTime || "0시간 0분"}
          studyContent={selectedRecord.content || ""}
          memo={selectedRecord.memo || []}
          onClose={() => setIsModalOpen(false)}
          onDelete={() => {
            setIsModalOpen(false);
          }}
          onSave={(updatedContent, updatedMemo) => {
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
