export function getCurrentMonth() {
  return getMonth(new Date());
}

export function getMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getMonthISOString(date: Date) {
  return date.toISOString().slice(0, 7);
}
