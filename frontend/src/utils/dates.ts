import { months, weekDays } from "../types/date";

export const formatDateNumber = (date: Date | string): string => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  
  return `${day}/${month}/${year}`;
};

export const formatDateString = (date: Date | string): string => {
  const d = new Date(date);
  const weekDay = d.getDay() ;
  const monthDay = d.getDate()
  const month = d.getMonth() + 1;
  
  return `${weekDays[weekDay]} ${monthDay} de ${months[month]} `;
};

export const formatMonth = (date: Date | string): number => {
  const d = new Date(date);
  const month = d.getMonth() + 1;
  return month;
};