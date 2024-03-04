import { Injectable, OnDestroy } from '@angular/core';
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns';
import { Moment } from 'moment';
import { BehaviorSubject, Subscription } from 'rxjs';

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
export class SchedulerService implements OnDestroy {
  private setOnlyOneDay = new BehaviorSubject<boolean>(false);
  setOnlyOneDay$ = this.setOnlyOneDay.asObservable();

  private weekSubject = new BehaviorSubject<Date[]>([]);
  week$ = this.weekSubject.asObservable();

  private currentDateSubject = new BehaviorSubject<Date>(new Date());
  currentDate$ = this.currentDateSubject.asObservable();

  private dataSubscription: Subscription = new Subscription();

  constructor() {
    this.dataSubscription.add(
      this.setOnlyOneDay$.subscribe(() => this.setWeek())
    );
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  updateOnlyOneDay(setOnlyOneDay: boolean) {
    this.setOnlyOneDay.next(setOnlyOneDay);
  }

  onDateChange(date: Moment) {
    if (this.isDifferentDay(date.toDate())) {
      this.currentDateSubject.next(date.toDate());
      this.setWeek();
    }
  }

  reset() {
    if (this.isDifferentDay(new Date())) {
      this.currentDateSubject.next(new Date());
      this.setWeek();
    }
  }

  private isDifferentDay(dateToSearch: Date): boolean {
    return !this.weekSubject
      .getValue()
      .some(
        (date) =>
          format(date, 'yyyy-MM-dd') === format(dateToSearch, 'yyyy-MM-dd')
      );
  }

  moveLeft() {
    const newDate = new Date(this.weekSubject.getValue()[0]);
    newDate.setDate(newDate.getDate() - this.getDaysToMove());
    this.currentDateSubject.next(newDate);
    this.setWeek();
  }

  moveRight() {
    const newDate = new Date(this.weekSubject.getValue()[0]);
    newDate.setDate(newDate.getDate() + this.getDaysToMove());
    this.currentDateSubject.next(newDate);
    this.setWeek();
  }

  private getDaysToMove(): number {
    return this.setOnlyOneDay.getValue() ? 1 : 7;
  }

  isToday(day: Date): boolean {
    return format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
  }

  isRightNow(hour: string): boolean {
    const today: Date = new Date();
    return (
      hour.split(':')[0] === today.getHours().toString() &&
      !this.isDifferentDay(today)
    );
  }

  setWeek() {
    const formattedCurrentWeek = this.setOnlyOneDay.getValue()
      ? [this.currentDateSubject.getValue()]
      : this.setWholeWeek(this.currentDateSubject.getValue());

    this.weekSubject.next(formattedCurrentWeek);
  }

  private setWholeWeek(date: Date): Date[] {
    const startOfCurrentWeek = startOfWeek(date, {
      weekStartsOn: 1,
    });
    const endOfCurrentWeek = endOfWeek(date, {
      weekStartsOn: 1,
    });
    const currentWeek = eachDayOfInterval({
      start: startOfCurrentWeek,
      end: endOfCurrentWeek,
    });
    const formattedCurrentWeek = currentWeek.map(
      (date) => new Date(format(date, 'yyyy-MM-dd'))
    );
    return formattedCurrentWeek;
  }

  getWeekDayName(today: Date): string {
    return WEEK_DAYS[today.getDay() === 0 ? 6 : today.getDay() - 1];
  }
}
