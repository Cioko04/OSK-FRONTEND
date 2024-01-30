import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DayWithDate, SchedulerService } from './scheduler.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css'],
})
export class SchedulerComponent implements OnInit, OnDestroy, AfterViewInit {
  daysWithDates!: DayWithDate[];
  dataSource: any = [];
  navContentHeight: number = 0;

  private dataSubscription: Subscription = new Subscription();

  @ViewChildren('hourCell') hourCells: QueryList<ElementRef> | undefined;
  @ViewChildren('weekDayCell') weekDayCells: QueryList<ElementRef> | undefined;
  @ViewChild('schedulerNav') schedulerNav: ElementRef | undefined;

  constructor(private schedulerService: SchedulerService) {}

  ngOnInit() {
    this.initSubscription();
    this.setHours();
  }

  private initSubscription() {
    this.dataSubscription.add(
      this.schedulerService.daysWithDates$.subscribe((daysWithDates) => {
        this.daysWithDates = daysWithDates;
      })
    );
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.scrollToCurrentHour();
    this.weekDayCells?.changes.subscribe(() => this.scrollToCurrentHour());
  }

  getColumnDefinition(): string[] {
    return [
      'time',
      ...this.daysWithDates.map((day) => day.dayOfWeek + day.dayOfMonth),
    ];
  }

  isToday(dayWithDate: DayWithDate): boolean {
    return this.schedulerService.isToday(dayWithDate);
  }

  isRightNow(hour: string): boolean {
    return this.schedulerService.isRightNow(hour);
  }

  private setHours() {
    for (let i = 0; i < 24; i++) {
      let hour = { time: `${i}:00` };
      this.dataSource.push(hour);
    }
  }

  private scrollToCurrentHour() {
    this.hourCells?.forEach((hourCell: ElementRef) => {
      const hour = hourCell.nativeElement.innerText.trim();
      if (this.isRightNow(hour)) {
        hourCell.nativeElement.scrollIntoView({
          behavior: "auto", block: "start"
        });
      }
    });
  }

  private getCurrentHourTopPosition(): number {
    const hourCell = this.hourCells?.filter((hourCell: ElementRef) => {
      const hour = hourCell.nativeElement.innerText.trim();
      return this.isRightNow(hour);
    })[0];
    return hourCell ? this.getPosition(hourCell.nativeElement).top : 0;
  }

  private getCurrentWeekLeftPosition(): number {
    // this.weekDayCells?.forEach((weekDayCell: ElementRef) => {
    //   const weekDayCellData = weekDayCell.nativeElement.innerText
    //     .trim()
    //     .split(/\r?\n/);
    //   if (
    //     this.isToday({
    //       dayOfWeek: weekDayCellData[0],
    //       dayOfMonth: parseInt(weekDayCellData[1]),
    //     })
    //   ) {
    //     weekDayCell.nativeElement.scrollIntoView({
    //       behavior: 'smooth',
    //       block: 'start',
    //     });
    //   }
    // });
    // const weekDayCell = this.weekDayCells?.filter((weekDayCell: ElementRef) => {
    //   const weekDayCellData = weekDayCell.nativeElement.innerText
    //     .trim()
    //     .split(/\r?\n/);
    //   return this.isToday({
    //     dayOfWeek: weekDayCellData[0],
    //     dayOfMonth: parseInt(weekDayCellData[1]),
    //   });
    // })[0];
    // return weekDayCell ? this.getPosition(weekDayCell.nativeElement).left : 0;
    return 0;
  }

  private getPosition(element: HTMLElement): {
    left: number;
    right: number;
    top: number;
    bottom: number;
  } {
    const rect = element.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      right: rect.right + window.scrollX,
      top: rect.top + window.scrollY,
      bottom: rect.bottom + window.scrollY,
    };
  }
}
