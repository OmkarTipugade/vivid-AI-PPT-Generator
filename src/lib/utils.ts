import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const timeAgo = (timestamp: string) => {
  const now = new Date();
  const diffInSecond = Math.floor(
    (now.getTime() - new Date(timestamp).getTime()) / 1000
  );
  const intervals = [
    { label: "year", value: 60 * 60 * 24 * 365 },
    { label: "month", value: 60 * 60 * 24 * 30 },
    { label: "week", value: 60 * 60 * 24 * 7 },
    { Label: "day", value: 60 * 60 * 24 },
    { label: "hour", value: 60 * 60 },
    { label: "minute", value: 60 },
    { label: "second", value: 1 },
  ];
  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    if (diffInSecond >= interval.value) {
      return `${Math.floor(diffInSecond / interval.value)} ${interval.label}${
        Math.floor(diffInSecond % interval.value) > 0 ? "s" : ""
      } ago`;
    }
  }
  return 'just now';
};
