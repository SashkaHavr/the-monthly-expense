export function getCurrentMonth() {
  return getMonth(new Date());
}

export function getMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
