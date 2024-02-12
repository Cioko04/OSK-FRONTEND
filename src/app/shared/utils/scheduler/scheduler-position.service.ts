import { ElementRef, Injectable, QueryList } from '@angular/core';
import { ScheduledSession } from '../../services/scheduled-session/scheduled-session';
import { DayWithDate, SchedulerService } from './scheduler.service';

export interface SchedulPosition {
  left: number;
  width: number;
  top: number;
  height: number;
}

@Injectable({
  providedIn: 'root',
})
export class SchedulerPositionService {
  constructor(
    private schedulerService: SchedulerService
  ) {}

  calculateSchedulPosition(
    schedul: ElementRef,
    scheduledSessions: ScheduledSession[],
    weekDayCells: QueryList<ElementRef>,
    hourCells: QueryList<ElementRef>
  ): SchedulPosition {
    if (!schedul || !weekDayCells || !hourCells) {
      throw new Error('Invalid input or missing data.');
    }
    
    const scheduledSession = scheduledSessions.find(
      (scheduledSession) =>
        scheduledSession.id === parseInt(schedul.nativeElement.id)
    )!;

    const { startDate, endDate } = scheduledSession;
    const relevantWeekDayCell = weekDayCells.find((weekDayCell: ElementRef) =>
      this.isWeekDatCellRelevant(weekDayCell, scheduledSession)
    );
    const relevantHourCell = hourCells.find((hourCell: ElementRef) =>
      this.isHourDatCellRelevant(hourCell, scheduledSession)
    );

    if (!relevantWeekDayCell || !relevantHourCell) {
      throw new Error('Unable to find relevant cells.');
    }

    const left = this.calculateLeftPosition(relevantWeekDayCell);
    const width = this.calculateWidth(relevantWeekDayCell);
    const top = this.calculateTopPosition(relevantHourCell, startDate);
    const height = this.calculateHeight(relevantHourCell, startDate, endDate);

    return { left, width, top, height };
  }

  private calculateLeftPosition(cell: ElementRef): number {
    return cell.nativeElement.offsetLeft;
  }

  private calculateWidth(cell: ElementRef): number {
    return cell.nativeElement.offsetWidth;
  }

  private calculateTopPosition(cell: ElementRef, startDate: Date): number {
    const timeCellHeight = cell.nativeElement.offsetHeight;
    const startMinutes = startDate.getMinutes();
    return cell.nativeElement.offsetTop + (timeCellHeight * startMinutes) / 60;
  }

  private calculateHeight(
    cell: ElementRef,
    startDate: Date,
    endDate: Date
  ): number {
    const timeCellHeight = cell.nativeElement.offsetHeight;
    const startHour = startDate.getHours();
    const startMinutes = startDate.getMinutes();
    const endHour = endDate.getHours();
    const endMinutes = endDate.getMinutes();
    return (
      timeCellHeight * (endHour - startHour + (endMinutes - startMinutes) / 60)
    );
  }

  private isHourDatCellRelevant(
    timeCell: ElementRef,
    scheduledSession: ScheduledSession
  ) {
    const timeCellData = this.getHursCellData(timeCell);
    const hour = scheduledSession.startDate.getHours();
    return timeCellData.hour === hour;
  }

  private getHursCellData(timeCell: ElementRef): {
    hour: number;
    minutes: number;
  } {
    const timeCellData = timeCell.nativeElement.innerText.trim().split(':');
    return {
      hour: parseInt(timeCellData[0]),
      minutes: parseInt(timeCellData[1]),
    };
  }

  private isWeekDatCellRelevant(
    weekDayCell: ElementRef,
    scheduledSession: ScheduledSession
  ) {
    const weekDayCellData = this.getWeekDayCellData(weekDayCell);
    const dayOfMonth = scheduledSession.startDate.getDate();
    const dayOfWeek = this.schedulerService.getWeekDayName(
      scheduledSession.startDate
    );
    return (
      weekDayCellData.dayOfWeek === dayOfWeek &&
      weekDayCellData.dayOfMonth === dayOfMonth
    );
  }

  private getWeekDayCellData(weekDayCell: ElementRef): DayWithDate {
    const weekDayCellData = weekDayCell.nativeElement.innerText
      .trim()
      .split(/\r?\n/);
    return {
      dayOfWeek: weekDayCellData[0],
      dayOfMonth: parseInt(weekDayCellData[1]),
    };
  }
}
