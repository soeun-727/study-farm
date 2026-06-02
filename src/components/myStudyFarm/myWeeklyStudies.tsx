import { useEffect, useState } from "react";

export default function myWeeklyStudies() {
  const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
  const [currentMonth, setCurrentMonth] = useState<number>(0);
  const [currentWeek, setCurrentWeek] = useState<number>(0);

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

  return (
    <div className="flex flex-col w-230 h-70 bg-(--primary-brown)/50 rounded-[15px] p-4 gap-4">
      {/* 헤더 영역 */}
      <div className="relative flex items-end justify-center w-full">
        <button className="absolute left-0 typo-caption text-(--gray-0) cursor-pointer">
          전체 학습 내역 &gt;
        </button>
        <p className="typo-body !font-semibold text-center">
          {currentMonth}월 {currentWeek}주차 학습 내역
        </p>
      </div>
      {/* 요일 영역 */}
      <div className="flex justify-between items-center w-full h-full gap-2">
        {DAYS.map((day, index) => (
          <div
            key={index}
            className="flex flex-col items-start justify-start py-4 px-2 w-28 h-full bg-(--gray-0) rounded-[25px] shadow-sm"
          >
            <span
              className={`typo-body2 !font-bold px-1 ${
                day === "일" || day === "토" ? "text-(--primary-brown)" : ""
              }`}
            >
              {day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
