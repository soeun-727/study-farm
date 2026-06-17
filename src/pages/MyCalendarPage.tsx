import { useState, useEffect } from "react";
import { LeftArrow, RightArrow } from "../assets/home/homeIndex";
import BackButton from "../components/ui/BackButton";
import StudyRecordModal from "../components/modals/StudyRecordModal";
import { firebaseService } from "../api/firebaseService";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface StudyLog {
  id?: string;
  date: any;
  startTime: string;
  title: string;
  duration: number;
  memo: string;
}

export default function MyCalendarPage() {
  const [viewDate, setViewDate] = useState(new Date());
  const [dbLogs, setDbLogs] = useState<StudyLog[]>([]);
  const [apiRecords, setApiRecords] = useState<Record<string, boolean>>({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<StudyLog | null>(null);

  const auth = getAuth();
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const nowDate = new Date();

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));
  const monthName = viewDate.toLocaleString("en-US", { month: "long" });

  const getFormattedDate = (d: number) =>
    `${year}.${String(month + 1).padStart(2, "0")}.${String(d).padStart(2, "0")}`;

  const fetchCalendarLogs = async (uid: string) => {
    try {
      const logs = await firebaseService.getStudyLogs(uid);
      setDbLogs(logs);

      const recordMap: Record<string, boolean> = {};
      logs.forEach((log) => {
        if (!log.date) return;
        const logDate = log.date.toDate();
        const kY = logDate.getFullYear();
        const kM = String(logDate.getMonth() + 1).padStart(2, "0");
        const kD = String(logDate.getDate()).padStart(2, "0");
        recordMap[`${kY}.${kM}.${kD}`] = true;
      });
      setApiRecords(recordMap);
    } catch (error) {
      console.error("캘린더 데이터 로드 실패:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchCalendarLogs(user.uid);
      }
    });
    return () => unsubscribe();
  }, [viewDate]);

  const handleDateClick = (dateStr: string) => {
    if (!apiRecords[dateStr]) return;

    const matchedLog = dbLogs.find((log) => {
      if (!log.date) return false;
      const d = log.date.toDate();
      const matchStr = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
      return matchStr === dateStr;
    });

    if (matchedLog) {
      setSelectedRecord(matchedLog);
      setIsModalOpen(true);
    }
  };

  const handleSaveRecord = async (
    updatedContent: string,
    updatedMemo: string[],
  ) => {
    const uid = auth.currentUser?.uid;
    if (!uid || !selectedRecord?.id) return;

    try {
      await firebaseService.updateStudyLog(uid, selectedRecord.id, {
        title: updatedContent,
        memo: updatedMemo.join("\n"),
      });
      setIsModalOpen(false);
      await fetchCalendarLogs(uid);
    } catch (error) {
      alert("기록을 수정하지 못했습니다.");
    }
  };

  const handleCancelRecord = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid || !selectedRecord?.id) return;

    try {
      await firebaseService.deleteStudyLog(uid, selectedRecord.id);
      setIsModalOpen(false);
      await fetchCalendarLogs(uid);
    } catch (error) {
      alert("기록을 삭제하지 못했습니다.");
    }
  };

  const formatStudyTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}시간 ${mins}분` : `${mins}분`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-(--primary-light-brown)">
      <BackButton />

      <div className="flex w-200 h-17 items-center justify-between rounded-[12px] px-6 mb-3 bg-(--gray-0) shadow-sm">
        <button
          onClick={prevMonth}
          className="px-3 py-1 active:scale-95 transition-transform text-(--gray-900)"
        >
          <LeftArrow />
        </button>
        <h2 className="typo-h1 tracking-tight">
          {monthName} {year}
        </h2>
        <button
          onClick={nextMonth}
          className="px-3 py-1 active:scale-95 transition-transform text-(--gray-900)"
        >
          <RightArrow />
        </button>
      </div>

      <div className="flex flex-col w-200 h-138 mx-auto items-center justify-between rounded-[12px] p-6 bg-(--gray-0) shadow-sm">
        <div className="grid grid-cols-7 w-full mb-2 shrink-0 border-b border-zinc-100 pb-1.5">
          {daysOfWeek.map((day) => {
            const isWeekend = day === "SUN" || day === "SAT";
            return (
              <div
                key={day}
                className={`text-center text-[14px] font-bold tracking-wider ${
                  isWeekend ? "text-(--primary-brown)" : "text-(--color-green)"
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-7 w-full flex-1 relative items-center">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = getFormattedDate(day);
            const hasRecord = Object.hasOwn(apiRecords, dateStr);
            const isToday =
              nowDate.getFullYear() === year &&
              nowDate.getMonth() === month &&
              nowDate.getDate() === day;

            const prevDate = new Date(year, month, day - 1);
            const nextDate = new Date(year, month, day + 1);
            const prevKey = `${prevDate.getFullYear()}.${String(prevDate.getMonth() + 1).padStart(2, "0")}.${String(prevDate.getDate()).padStart(2, "0")}`;
            const nextKey = `${nextDate.getFullYear()}.${String(nextDate.getMonth() + 1).padStart(2, "0")}.${String(nextDate.getDate()).padStart(2, "0")}`;
            const hasPrev = Object.hasOwn(apiRecords, prevKey);
            const hasNext = Object.hasOwn(apiRecords, nextKey);
            const isContinuous = hasRecord && (hasPrev || hasNext);

            return (
              <div
                key={dateStr}
                className="relative flex justify-center items-center w-full h-full min-h-0"
              >
                {isToday && (
                  <div className="absolute top-3 z-40 w-1.5 h-1.5 bg-(--primary-orange) rounded-full" />
                )}

                {isContinuous && (
                  <div
                    className={`
                    absolute top-1/2 -translate-y-1/2 h-[85%] bg-(--primary-yellow) z-0
                    ${hasPrev && hasNext ? "left-[-4px] right-[-4px] rounded-none" : ""}
                    ${hasPrev && !hasNext ? "left-[-4px] right-[calc(50%-24px)] rounded-r-full" : ""}
                    ${!hasPrev && hasNext ? "left-[calc(50%-24px)] right-[-4px] rounded-l-full" : ""}
                  `}
                  />
                )}

                <button
                  onClick={() => handleDateClick(dateStr)}
                  disabled={!hasRecord}
                  className={`
                    relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all text-base font-bold
                    ${hasRecord ? "scale-105 bg-(--primary-yellow) text-white shadow-sm hover:bg-(--primary-orange) cursor-pointer" : "text-neutral-800 opacity-40"}
                  `}
                >
                  <span>{day}</span>
                </button>
              </div>
            );
          })}
        </div>
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
