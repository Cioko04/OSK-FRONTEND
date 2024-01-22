import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Moment } from 'moment';

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

interface DayWithDate {
  dayOfWeek: string;
  dayOfMonth: number;
}

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css'],
})
export class SchedulerComponent implements OnInit {
  months: string[] = MONTHS;
  years: number[] = [];
  daysWithDates!: DayWithDate[];
  startYear!: number;
  endYear!: number;
  currentDate!: Date;
  currentYear!: number;
  currentMonth!: string;
  currentDayOfWeek!: string;
  currentDayOfMonth!: number;
  todayYear!: number;
  todayMonth!: string | null;
  todayDayOfWeek!: string;
  todayDayOfMonth!: number;

  dataSource = [
    {
      left: '10:00',
    },
    {
      left: '11:00',
    },
  ];

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
  }

  onDateChange(date: Moment) {
    this.currentDate = date.toDate();
    this.setCurrentValues();
    console.log(this.currentDate);
  }

  moveLeft() {
    let newDate = new Date(this.currentDate);
    newDate.setDate(newDate.getDate() - 7);
    this.currentDate = newDate;
    this.setCurrentValues();
  }

  moveRight() {
    let newDate = new Date(this.currentDate);
    newDate.setDate(newDate.getDate() + 7);
    this.currentDate = newDate;
    this.setCurrentValues();
  }

  getColumnDefinition(): string[] {
    return [
      'left',
      ...this.daysWithDates.map((day) => day.dayOfWeek + day.dayOfMonth),
      'right',
    ];
  }

  isToday(dayWithDate: DayWithDate): boolean {
    return (
      dayWithDate.dayOfWeek === this.todayDayOfWeek &&
      dayWithDate.dayOfMonth === this.todayDayOfMonth &&
      this.currentMonth === this.todayMonth &&
      this.currentYear === this.todayYear
    );
  }

  reset() {
    let newDate = new Date();
    this.currentDate = newDate;
    this.setCurrentValues();
  }
}
