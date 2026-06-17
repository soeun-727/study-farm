import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudyRecordModal from "../modals/StudyRecordModal";
import type { Timestamp } from "firebase/firestore";
import { firebaseService } from "../../api/firebaseService";
import { getAuth } from "firebase/auth";
export interface StudyLog {
  id?: string;
  date: Timestamp;
  startTime: string;
  title: string;
  duration: number;
  memo: string;
}
interface MyWeeklyStudiesProps {
  weeklyRecords?: StudyLog[];
  refreshData?: () => void;
}

interface SelectedModalData extends StudyLog {
  dayName: string;
}

export default function MyWeeklyStudies({
  weeklyRecords = [],
  refreshData,
}: MyWeeklyStudiesProps) {
  const navigate = useNavigate();
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

  const getGroupedRecords = (): Record<string, StudyLog[]> => {
    const grouped: Record<string, StudyLog[]> = {
      일: [],
      월: [],
      화: [],
      수: [],
      목: [],
      금: [],
      토: [],
    };

    const today = new Date();
    const currentSunday = new Date(
      today.setDate(today.getDate() - today.getDay()),
    );
    currentSunday.setHours(0, 0, 0, 0);

    const currentSaturday = new Date(currentSunday);
    currentSaturday.setDate(currentSaturday.getDate() + 6);
    currentSaturday.setHours(23, 59, 59, 999);

    weeklyRecords.forEach((record) => {
      if (!record.date) return;
      const recordDate = record.date.toDate();

      if (recordDate >= currentSunday && recordDate <= currentSaturday) {
        const dayIndex = recordDate.getDay();
        const dayName = DAYS[dayIndex];
        grouped[dayName].push(record);
      }
    });

    Object.keys(grouped).forEach((day) => {
      grouped[day].sort((a, b) => b.startTime.localeCompare(a.startTime));
    });

    return grouped;
  };

  const groupedWeeklyRecords = getGroupedRecords();

  const handleRecordClick = (dayName: string, record: StudyLog) => {
    setSelectedRecord({ ...record, dayName });
    setIsModalOpen(true);
  };

  const handleSaveRecord = async (
    updatedContent: string,
    updatedMemo: string[],
  ) => {
    if (!selectedRecord?.id) return;

    try {
      const memoString = updatedMemo.join("\n");
      const auth = getAuth();
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      await firebaseService.updateStudyLog(uid, selectedRecord.id, {
        title: updatedContent,
        memo: memoString,
      });

      if (refreshData) {
        await refreshData();
      }
      setIsModalOpen(false);
    } catch (error) {
      alert("수정사항을 저장하지 못했습니다.");
    }
  };

  const handleCancelRecord = async () => {
    if (!selectedRecord?.id) return;

    try {
      const auth = getAuth();
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      await firebaseService.deleteStudyLog(uid, selectedRecord.id);

      if (refreshData) {
        await refreshData();
      }
      setIsModalOpen(false);
    } catch (error) {
      alert("기록 삭제에 실패했습니다.");
    }
  };

  const formatStudyTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}시간 ${mins}분` : `${mins}분`;
  };

  return (
    <div className="flex flex-col w-230 h-70 bg-(--primary-brown)/50 rounded-[15px] p-4 gap-4">
      <div className="relative flex items-end justify-center w-full">
        {/* 🚨 버튼 클릭 시 /calendar 경로로 이동 설정 */}
        <button
          onClick={() => navigate("/calendar")}
          className="absolute left-0 typo-caption text-(--gray-0) cursor-pointer"
        >
          전체 학습 내역 &gt;
        </button>
        <p className="typo-body !font-semibold text-center">
          {currentMonth}월 {currentWeek}주차 학습 내역
        </p>
      </div>

      <div className="flex justify-between items-center w-full h-full gap-2 overflow-hidden">
        {DAYS.map((day, index) => {
          const dayRecords = groupedWeeklyRecords[day] || [];
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

              <div className="flex flex-col w-full h-full gap-1 pt-2 overflow-hidden">
                {dayRecords.map((record, rIndex) => (
                  <button
                    key={`${day}-${rIndex}`}
                    onClick={() => handleRecordClick(day, record)}
                    className="w-full text-left flex-1 max-h-10 min-h-0 flex flex-col"
                  >
                    <div className="flex gap-1 items-start bg-(--primary-yellow) h-full w-full px-1 typo-body2 flex-1 min-h-0">
                      <span className="font-semibold shrink-0">
                        {Number(record.startTime.split(":")[0])}시{" "}
                      </span>
                      {record.title && record.title.trim() !== "" && (
                        <span className="font-normal truncate">
                          {record.title}
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
          month={selectedRecord.date.toDate().getMonth() + 1}
          day={selectedRecord.date.toDate().getDate()}
          time={`${selectedRecord.startTime.split(":")[0]}시`}
          studyTime={formatStudyTime(selectedRecord.duration)}
          studyContent={selectedRecord.title || ""}
          memo={selectedRecord.memo ? [selectedRecord.memo] : []}
          onClose={() => setIsModalOpen(false)}
          onDelete={handleCancelRecord}
          onSave={handleSaveRecord}
        />
      )}
    </div>
  );
}
