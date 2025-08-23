export function getCurrentMonth() {
  return getMonth(new Date());
}

export function getMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getMonthISOString(date: Date) {
  return date.toISOString().slice(0, 7);
}

export function parseMonthIsoString(string: string) {
  const [year, month] = string.split('-').map(Number.parseInt);
  if (
    Number.isNaN(year) ||
    Number.isNaN(month) ||
    year == undefined ||
    month == undefined
  ) {
    throw new Error('Invalid month format');
  }
  return { year, month };
}
