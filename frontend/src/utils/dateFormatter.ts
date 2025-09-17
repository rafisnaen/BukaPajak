// src/utils/dateFormatter.ts
import { format, isValid, parseISO } from "date-fns";
import { id as indonesianLocale } from "date-fns/locale/id";

export const formatDate = (
  date: string | Date | null | undefined,
  formatString: string = "dd/MM/yyyy",
  defaultValue: string = "Invalid Date"
): string => {
  if (!date) return defaultValue;
  
  try {
    // Handle both ISO string and Date objects
    const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
    
    if (!isValid(dateObj)) return defaultValue;
    
    return format(dateObj, formatString, { locale: indonesianLocale });
  } catch (error) {
    console.error("Error formatting date:", error);
    return defaultValue;
  }
};

export const formatDateTime = (date: string | Date | null | undefined): string => {
  return formatDate(date, "dd/MM/yyyy HH:mm");
};

export const formatLongDate = (date: string | Date | null | undefined): string => {
  return formatDate(date, "dd MMMM yyyy");
};