import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { Subscription, debounceTime, fromEvent } from 'rxjs';
import { ScheduledSession } from '../../services/scheduled-session/scheduled-session';
import { ScheduledSessionService } from '../../services/scheduled-session/scheduled-session.service';
import { SchedulerPositionService } from './scheduler-position.service';
import { SchedulerService } from './scheduler.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css'],
})
export class SchedulerComponent implements OnInit, OnDestroy, AfterViewChecked {
  week!: Date[];
  dataSource: any = [];
  setOnlyOneDay: boolean = false;
  isSmallScreen: boolean = false;

  scheduledSessions: ScheduledSession[] = [];

  private dataSubscription: Subscription = new Subscription();

  @ViewChildren('timeCell') timeCells: QueryList<ElementRef> | undefined;
  @ViewChildren('weekDayCell') weekDayCells: QueryList<ElementRef> | undefined;
  @ViewChildren('schedul') scheduls: QueryList<ElementRef> | undefined;

  constructor(
    private schedulerService: SchedulerService,
    private schedulerPositionService: SchedulerPositionService,
    private scheduledSessionService: ScheduledSessionService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.adjustBooleansToScreenSize(window.innerWidth);
    this.isSmallScreen = this.setOnlyOneDay;
    this.schedulerService.reset();
    this.initSubscription();
    this.setHours();
  }

  ngAfterViewChecked() {
    this.scrollToCurrentHour();
    this.setSchedulPosition();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustBooleansToScreenSize(event.target.innerWidth);
    if (this.setOnlyOneDay !== this.isSmallScreen) {
      this.isSmallScreen = this.setOnlyOneDay;
      this.schedulerService.setWeek();
    }
  }

  private adjustBooleansToScreenSize(windowSize: number) {
    this.setOnlyOneDay = windowSize <= 856;
    this.schedulerService.setOnlyOneDay = this.setOnlyOneDay;
    this.scheduledSessionService.setOnlyOneDay = this.setOnlyOneDay;
  }

  private initSubscription() {
    this.dataSubscription.add(
      this.schedulerService.week$.subscribe((week) => {
        if (this.week !== week) {
          this.week = week;
        }
      })
    );

    this.dataSubscription.add(
      this.scheduledSessionService.scheduledSessionSubject$.subscribe(
        (scheduledSessions) => {
          if (this.scheduledSessions !== scheduledSessions) {
            this.scheduledSessions = scheduledSessions;
          }
        }
      )
    );
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  getColumnDefinition(): string[] {
    return [
      'time',
      ...this.week.map((day) => this.getWeekDayName(day) + day.getDate()),
    ];
  }

  getWeekDayName(day: Date) {
    return this.schedulerService.getWeekDayName(day);
  }

  isToday(day: Date): boolean {
    return this.schedulerService.isToday(day);
  }

  isRightNow(hour: string): boolean {
    return this.schedulerService.isRightNow(hour);
  }

  isInCurrentWeek(date: Date) {
    return date >= new Date(2024, 1, 5) && date <= new Date(2024, 1, 11);
  }

  private setHours() {
    for (let i = 0; i < 24; i++) {
      let hour = { time: `${i}:00` };
      this.dataSource.push(hour);
    }
  }

  private scrollToCurrentHour() {
    this.timeCells!.forEach((hourCell: ElementRef) => {
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
    if (this.scheduls && this.scheduledSessions.length > 0) {
      this.scheduls.forEach((schedul: ElementRef) => {
        if (schedul && this.weekDayCells && this.timeCells) {
          const schedulPosition =
            this.schedulerPositionService.calculateSchedulPosition(
              schedul,
              this.scheduledSessions,
              this.weekDayCells,
              this.timeCells
            );
          this.renderer.setStyle(
            schedul.nativeElement,
            'left',
            schedulPosition.left + 'px'
          );
          this.renderer.setStyle(
            schedul.nativeElement,
            'width',
            schedulPosition.width - 30 + 'px'
          );
          this.renderer.setStyle(
            schedul.nativeElement,
            'margin-left',
            15 + 'px'
          );
          this.renderer.setStyle(
            schedul.nativeElement,
            'top',
            schedulPosition.top + 'px'
          );
          this.renderer.setStyle(
            schedul.nativeElement,
            'height',
            schedulPosition.height + 'px'
          );
        }
      });
    }
  }
}
