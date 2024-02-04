import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SchedulPositionService } from './schedul-position.service';
import { DayWithDate, SchedulerService } from './scheduler.service';

export interface ScheduledTime {
  id: number;
  instruktor: string;
  startTime: Date;
  endTime: Date;
}

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css'],
})
export class SchedulerComponent implements OnInit, OnDestroy, AfterViewInit {
  daysWithDates!: DayWithDate[];
  dataSource: any = [];

  scheduledTimes: ScheduledTime[] = [
    {
      id: 1,
      instruktor: 'Jacek',
      startTime: new Date(2024, 1, 3, 12, 30),
      endTime: new Date(2024, 1, 3, 15, 0),
    },
    {
      id: 2,
      instruktor: 'Andrzej',
      startTime: new Date(2024, 1, 2, 9, 0),
      endTime: new Date(2024, 1, 2, 11, 30),
    },
  ];

  private dataSubscription: Subscription = new Subscription();

  @ViewChildren('timeCell') timeCells: QueryList<ElementRef> | undefined;
  @ViewChildren('weekDayCell') weekDayCells: QueryList<ElementRef> | undefined;
  @ViewChildren('schedul') scheduls: QueryList<ElementRef> | undefined;

  constructor(
    private schedulerService: SchedulerService,
    private schedulPositionService: SchedulPositionService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.initSubscription();
    this.setHours();
  }

  ngAfterViewInit() {
    this.scrollToCurrentHour();
    this.setSchedulPosition();
    this.weekDayCells?.changes.subscribe(() => this.scrollToCurrentHour());
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
    this.timeCells?.forEach((hourCell: ElementRef) => {
      const hour = hourCell.nativeElement.innerText.trim();
      if (this.isRightNow(hour)) {
        hourCell.nativeElement.scrollIntoView({
          behavior: 'auto',
          block: 'start',
        });
      }
    });
  }

  private setSchedulPosition() {
      this.scheduls!.forEach((schedul: ElementRef) => {
        if (schedul && this.weekDayCells && this.timeCells) {
          const schedulPosition = this.schedulPositionService.calculateSchedulPosition(schedul, this.weekDayCells, this.timeCells)
          this.renderer.setStyle(schedul.nativeElement, 'left', schedulPosition.left + 'px');
          this.renderer.setStyle(schedul.nativeElement, 'width', schedulPosition.width - 30 + 'px');
          this.renderer.setStyle(schedul.nativeElement, 'margin-left', 15 + 'px');
          this.renderer.setStyle(schedul.nativeElement, 'top', schedulPosition.top + 'px');
          this.renderer.setStyle(schedul.nativeElement, 'height', schedulPosition.height + 'px');
        }
      });
    
  }
}
