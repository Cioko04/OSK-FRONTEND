import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { BehaviorSubject } from 'rxjs';

const WEEK_DAYS: string[] = [
  'Poniedziałek',
  'Wtorek',
  'Środa',
  'Czwartek',
  'Piątek',
  'Sobota',
  'Niedziela',
];

export interface DayWithDate {
  dayOfWeek: string;
  dayOfMonth: number;
}

@Injectable({
    providedIn: 'root',
  })
export class SchedulerService {
  private daysWithDatesSubject = new BehaviorSubject<DayWithDate[]>([]);
  daysWithDates$ = this.daysWithDatesSubject.asObservable();

  private currentDateSubject = new BehaviorSubject<Date>(new Date());
  currentDate$ = this.currentDateSubject.asObservable();

  constructor() {
    this.setDaysWithDates();
  }

  onDateChange(date: Moment) {
    this.currentDateSubject.next(date.toDate());
    this.setDaysWithDates();
  }

  moveLeft() {
    let newDate = new Date(this.currentDateSubject.getValue());
    newDate.setDate(newDate.getDate() - 7);
    this.currentDateSubject.next(newDate);
    this.setDaysWithDates();
  }

  moveRight() {
    let newDate = new Date(this.currentDateSubject.getValue());
    newDate.setDate(newDate.getDate() + 7);
    this.currentDateSubject.next(newDate);
    this.setDaysWithDates();
  }

  reset() {
    this.currentDateSubject.next(new Date());
    this.setDaysWithDates();
  }

  isToday(dayWithDate: DayWithDate): boolean {
    const today: Date = new Date();
    return (
      dayWithDate.dayOfWeek === this.getWeekDayName(today) &&
      dayWithDate.dayOfMonth === today.getDate() &&
      this.currentDateSubject.getValue().getMonth() === today.getMonth() &&
      this.currentDateSubject.getValue().getFullYear() === today.getFullYear()
    );
  }

  isRightNow(hour: string): boolean {
    const today: Date = new Date();
    return (
      hour.split(':')[0] === today.getHours().toString() &&
      this.currentDateSubject.getValue().toDateString() === today.toDateString()
    );
  }

  private setDaysWithDates() {
    this.daysWithDatesSubject.next(
      WEEK_DAYS.map((day) => {
        let daysToAdd =
          WEEK_DAYS.indexOf(day) -
          WEEK_DAYS.indexOf(this.getWeekDayName(this.currentDateSubject.getValue()));
        let dayInWeek = new Date(this.currentDateSubject.getValue());
        dayInWeek.setDate(this.currentDateSubject.getValue().getDate() + daysToAdd);
        return {
          dayOfWeek: day,
          dayOfMonth: dayInWeek.getDate(),
        };
      })
    );
  }

  private getWeekDayName(today: Date): string {
    return WEEK_DAYS[today.getDay() === 0 ? 6 : today.getDay() - 1];
  }
}
