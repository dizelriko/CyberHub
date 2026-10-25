export const ALL_TIME_SLOTS = [
  {
    group: "Дневное время",
    times: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
  },
  {
    group: "Вечер (Прайм-тайм)",
    times: ["18:00", "19:00", "20:00", "21:00"],
  },
  {
    group: "Ночные пакеты / 24/7",
    times: [
      "22:00",
      "23:00 (Пакет Ночь)",
      "00:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
    ],
  },
];

export const formatDateToISO = (d: Date) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const isTimeSlotPassed = (timeSlot: string, selectedDateISO: string): boolean => {
  const now = new Date();
  const todayISO = formatDateToISO(now);

  // Будущие даты никогда не считаются прошедшими
  if (selectedDateISO !== todayISO) {
    return false;
  }

  const match = timeSlot.match(/^(\d{1,2}):(\d{2})/);
  if (!match) return false;

  const hour = parseInt(match[1], 10);
  const min = parseInt(match[2], 10);

  const slotDate = new Date(now);
  slotDate.setHours(hour, min, 0, 0);

  // Если время слота меньше или равно текущему времени
  return slotDate.getTime() <= now.getTime();
};

export const getFirstAvailableTime = (selectedDateISO: string, preferred = "18:00"): string => {
  if (!isTimeSlotPassed(preferred, selectedDateISO)) {
    return preferred;
  }

  for (const group of ALL_TIME_SLOTS) {
    for (const slot of group.times) {
      if (!isTimeSlotPassed(slot, selectedDateISO)) {
        return slot;
      }
    }
  }

  return "23:00 (Пакет Ночь)";
};

export const getQuickTimesForDate = (selectedDateISO: string): string[] => {
  const defaultQuick = ["16:00", "18:00", "20:00", "22:00", "23:00 (Пакет Ночь)"];
  const now = new Date();
  const todayISO = formatDateToISO(now);

  if (selectedDateISO !== todayISO) {
    return defaultQuick;
  }

  // Собираем оставшиеся доступные слоты на сегодня
  const remaining: string[] = [];
  for (const group of ALL_TIME_SLOTS) {
    for (const slot of group.times) {
      if (!isTimeSlotPassed(slot, selectedDateISO)) {
        remaining.push(slot);
      }
    }
  }

  if (remaining.length === 0) {
    return ["23:00 (Пакет Ночь)"];
  }

  // Возвращаем первые 4-5 актуальных слотов
  return remaining.slice(0, 5);
};
