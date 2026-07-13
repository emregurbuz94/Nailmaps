const WEEKDAY_ABBR = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cts"];
const MONTH_ABBR = [
  "Oca",
  "Şub",
  "Mar",
  "Nis",
  "May",
  "Haz",
  "Tem",
  "Ağu",
  "Eyl",
  "Eki",
  "Kas",
  "Ara",
];

export interface DayOption {
  date: Date;
  dayLabel: string;
  dayNum: number;
  monthLabel: string;
  iso: string;
}

export function nextDays(count: number, from: Date = new Date()): DayOption[] {
  return Array.from({ length: count }).map((_, i) => {
    const date = new Date(from);
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + i);
    return {
      date,
      dayLabel: i === 0 ? "Bug." : WEEKDAY_ABBR[date.getDay()],
      dayNum: date.getDate(),
      monthLabel: MONTH_ABBR[date.getMonth()],
      iso: date.toISOString().slice(0, 10),
    };
  });
}

export function formatDayFull(date: Date): string {
  return `${date.getDate()} ${MONTH_ABBR[date.getMonth()]}, ${WEEKDAY_ABBR[date.getDay()]}`;
}
