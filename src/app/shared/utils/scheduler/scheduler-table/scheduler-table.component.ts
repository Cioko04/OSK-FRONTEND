import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';
import { SchedulePlaceholderPositionService } from '../schedule-placeholder/schedule-placeholder-position.service';
import { SchedulerService } from '../scheduler.service';

@Component({
  selector: 'app-scheduler-table',
  templateUrl: './scheduler-table.component.html',
  styleUrls: ['./scheduler-table.component.css', '../../utils-style.css']
})
export class SchedulerTableComponent implements OnInit {
  week!: Date[];
  dataSource: any = [];
  setOnlyOneDay: boolean = false;
  isSmallScreen: boolean = false;
  private dataSubscription: Subscription = new Subscription();

  @ViewChildren('timeCell') timeCells: QueryList<ElementRef> | undefined;
  @ViewChildren('weekDayCell') weekDayCells: QueryList<ElementRef> | undefined;

  @Output()
  onAdd = new EventEmitter<any>();

  constructor(private schedulerService: SchedulerService,
    private scheduleService: ScheduleService,
    private schedulePlaceholderPositionService: SchedulePlaceholderPositionService) { }

  ngOnInit() {
    this.schedulerService.reset();
    this.setOnlyOneDay = window.innerWidth <= 856;
    this.adjustBooleansToScreenSize();
    this.schedulerService.setWeek();
    this.initSubscription();
    this.setHours();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setOnlyOneDay = event.target.innerWidth <= 856;
    if (this.setOnlyOneDay !== this.isSmallScreen) {
      this.adjustBooleansToScreenSize();
    }
  }

  ngAfterViewInit() {
    this.scrollToCurrentHour();
    this.schedulePlaceholderPositionService.weekDayCells = this.weekDayCells;
    this.schedulePlaceholderPositionService.hourCells = this.timeCells;
  }

  private adjustBooleansToScreenSize() {
    this.isSmallScreen = this.setOnlyOneDay;
    this.schedulerService.updateOnlyOneDay(this.setOnlyOneDay);
  }

  private initSubscription() {
    this.dataSubscription.add(
      this.schedulerService.week$.subscribe((week) => {
        if (this.week !== week) {
          this.week = week;
          this.scheduleService.updateScheduleSubjectForDate(
            week
          );
        }
      })
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

  addSession(scheduledSession: Date, time: any) {
    scheduledSession.setHours(time.split(':')[0]);
    this.onAdd.emit(scheduledSession);
  }

}
