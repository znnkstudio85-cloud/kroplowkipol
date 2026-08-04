export const WORK_HOURS = [
  '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
];

export function isSunday(dateStr: string): boolean {
  return false; // Open 24/7 7 days a week
}

export function getTodayDateStr(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getInitialValidDateStr(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getMaxDateStr(daysAhead = 90): string {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function isTimeSlotValidForDate(dateStr: string, timeSlot: string): boolean {
  if (!dateStr || !timeSlot) return false;

  const todayStr = getTodayDateStr();
  const maxStr = getMaxDateStr(90);

  if (dateStr < todayStr || dateStr > maxStr) return false;

  return true;
}

export interface ValidationResult {
  valid: boolean;
  message?: string;
}

export function validateBookingDateTime(
  dateStr: string,
  timeStr: string,
  lang: string = 'pl'
): ValidationResult {
  const isPl = lang !== 'en';

  if (!dateStr) {
    return {
      valid: false,
      message: isPl ? 'Wybierz datę zabiegu.' : 'Please select a date.',
    };
  }

  if (!timeStr) {
    return {
      valid: false,
      message: isPl ? 'Wprowadź preferowaną godzinę zabiegu.' : 'Please enter preferred time.',
    };
  }

  // Check valid time format (HH:MM or HH.MM)
  const timePattern = /^([0-1]?[0-9]|2[0-3])[:.][0-5][0-9]$/;
  if (!timePattern.test(timeStr.trim())) {
    return {
      valid: false,
      message: isPl
        ? 'Wprowadź prawidłowy format godziny HH:MM (np. 14:30).'
        : 'Please enter valid time format HH:MM (e.g. 14:30).',
    };
  }

  const todayStr = getTodayDateStr();
  const maxStr = getMaxDateStr(90);

  if (dateStr < todayStr) {
    return {
      valid: false,
      message: isPl
        ? 'Nie można wybrać daty z przeszłości.'
        : 'You cannot select a past date.',
    };
  }

  if (dateStr > maxStr) {
    return {
      valid: false,
      message: isPl
        ? 'Maksymalny termin rezerwacji to 90 dni od dzisiaj.'
        : 'Maximum booking window is 90 days from today.',
    };
  }

  return { valid: true };
}

