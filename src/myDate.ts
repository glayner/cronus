export class MyDate extends Date {
  addDays(days: number) {
    this.setDate(this.getDate() + days);
    return this;
  }

  subDays(days: number) {
    this.setDate(this.getDate() - days);
    return this;
  }

  isBetween(startDate: Date, endDate: Date) {
    return this >= startDate && this <= endDate;
  }

  day(day: number) {
    this.setDate(day);
    return this;
  }

  month(month: number) {
    this.setMonth(month - 1);
    return this;
  }

  year(year: number) {
    this.setFullYear(year);
    return this;
  }

  startOfDay() {
    this.setHours(0, 0, 0, 0);
    return this;
  }

  endOfDay() {
    this.setHours(23, 59, 59, 999);
    return this;
  }
}
