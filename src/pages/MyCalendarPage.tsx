import { useState } from "react";
import { LeftArrow, RightArrow } from "../assets/home/homeIndex";

interface Props {
  onDateClick?: (date: string) => void;
}

export default function MyCalendarPage({ onDateClick }: Props) {
  const [viewDate, setViewDate] = useState(new Date());
  const [apiRecords] = useState<Record<string, boolean>>({
    "2026.05.15": true,
    "2026.05.16": true,
  });

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

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* 1. 헤더  */}
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
        {/* 2. 요일 */}
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

        {/* 3. 날짜 그리드 */}
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

            // 연속 배경 계산
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
                {/* 오늘 표시 마커 */}
                {isToday && (
                  <div className="absolute top-3 z-40 w-1.5 h-1.5 bg-(--primary-orange) rounded-full" />
                )}

                {/* 연속 배경 */}
                {isContinuous && (
                  <div
                    className={`
                    absolute top-1/2 -translate-y-1/2 h-[85%] bg-(--primary-yellow) z-0
                    ${hasPrev && hasNext ? "left-[-4px] right-[-4px] rounded-none" : ""}
                    ${hasPrev && !hasNext ? "left-[-4px] right-[calc(50%-32px)] rounded-r-full" : ""}
                    ${!hasPrev && hasNext ? "left-[calc(50%-32px)] right-[-4px] rounded-l-full" : ""}
                  `}
                  />
                )}

                {/* 날짜 버튼 */}
                <button
                  onClick={() => onDateClick?.(dateStr)}
                  className={`
                    relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all text-base font-bold
                    ${hasRecord ? "scale-105 bg-(--primary-yellow) text-white shadow-sm hover:bg-(--primary-orange)/80" : "text-neutral-800"}
                  `}
                >
                  <span>{day}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
