import { Component, OnInit } from '@angular/core';

const MONTHS: string[] = [
  'Styczeń',
  'Luty',
  'Marzec',
  'Kwiecień',
  'Maj',
  'Czerwiec',
  'Lipiec',
  'Sierpień',
  'Wrzesień',
  'Październik',
  'Listopad',
  'Grudzień',
];

const WEEK_DAYS: string[] = [
  'Poniedziałek',
  'Wtorek',
  'Środa',
  'Czwartek',
  'Piątek',
  'Sobota',
  'Niedziela',
];

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css'],
})
export class SchedulerComponent implements OnInit {
  months: string[] = MONTHS;
  years: number[] = [];
  daysWithDates!: { dayOfWeek: string; dayOfMonth: number }[];
  startYear!: number;
  endYear!: number;
  currentDate!: Date;
  currentYear!: number;
  currentMonth!: string;
  currentDayOfWeek!: string;
  currentDayOfMonth!: number;
  currentDayWithDayIndex!: { dayOfWeek: string; dayOfMonth: number };
  todayYear!: number;
  todayMonth!: string;
  todayDayOfWeek!: string;
  todayDayOfMonth!: number;

  constructor() {}

  ngOnInit() {
    this.currentDate = new Date();
    this.setTodayValues();
    this.setCurrentValues();
  }

  private setTodayValues() {
    this.todayYear = this.currentDate.getFullYear();
    this.todayMonth = this.months[this.currentDate.getMonth()];
    this.todayDayOfWeek =
      WEEK_DAYS[
        this.currentDate.getDay() === 0 ? 6 : this.currentDate.getDay() - 1
      ];
    this.todayDayOfMonth = this.currentDate.getDate();
    this.setYearValues();
  }

  private setYearValues() {
    this.endYear = this.todayYear + 50;
    this.startYear = this.todayYear - 50;
    for (let year = this.startYear; year <= this.endYear; year++) {
      this.years.push(year);
    }
  }

  private setCurrentValues() {
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.months[this.currentDate.getMonth()];
    this.currentDayOfWeek =
      WEEK_DAYS[
        this.currentDate.getDay() === 0 ? 6 : this.currentDate.getDay() - 1
      ];
    this.currentDayOfMonth = this.currentDate.getDate();
    this.setDaysWithDates();
  }

  private setDaysWithDates() {
    this.daysWithDates = WEEK_DAYS.map((day) => {
      let daysToAdd =
        WEEK_DAYS.indexOf(day) - WEEK_DAYS.indexOf(this.currentDayOfWeek);
      let dayInWeek = new Date(this.currentDate);
      dayInWeek.setDate(this.currentDate.getDate() + daysToAdd);
      return {
        dayOfWeek: day,
        dayOfMonth: dayInWeek.getDate(),
      };
    });
    this.setCurrentDayWithDayIndex();
  }

  private setCurrentDayWithDayIndex() {
    this.currentDayWithDayIndex = this.daysWithDates.filter(
      (dayWithDate) =>
        dayWithDate.dayOfWeek === this.todayDayOfWeek &&
        dayWithDate.dayOfMonth === this.todayDayOfMonth &&
        this.currentMonth === this.todayMonth &&
        this.currentYear === this.todayYear
    )[0];
  }

  onYearChange() {
    this.currentDate.setFullYear(this.currentYear);
    this.setCurrentValues();
  }

  onMonthChange() {
    this.currentDate.setMonth(MONTHS.indexOf(this.currentMonth))
    this.setCurrentValues();
  }

  moveLeft() {
    let date = this.currentDate;
    date.setDate(date.getDate() - 7);
    this.currentDate = date;
    this.setCurrentValues();
  }

  moveRight() {
    let date = this.currentDate;
    date.setDate(date.getDate() + 7);
    this.currentDate = date;
    this.setCurrentValues();
  }
}
