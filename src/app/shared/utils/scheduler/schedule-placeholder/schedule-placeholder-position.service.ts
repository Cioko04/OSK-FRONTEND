import { ElementRef, Injectable, QueryList } from '@angular/core';
import { Schedule } from '../../../services/schedule/schedule';
import { DayWithDate, SchedulerService } from '../scheduler.service';

export interface SchedulePlaceholderPosition {
  left: number;
  width: number;
  top: number;
  height: number;
}

@Injectable({
  providedIn: 'root',
})
export class SchedulePlaceholderPositionService {
  weekDayCells: QueryList<ElementRef> | undefined;
  hourCells: QueryList<ElementRef> | undefined;

  constructor(private schedulerService: SchedulerService) {}

  calculateSchedulePlaceholderPosition(
    schedulePlaceholder: ElementRef,
    schedule: Schedule
  ): SchedulePlaceholderPosition {
    if (!schedulePlaceholder || !this.weekDayCells || !this.hourCells) {
      throw new Error('Invalid input or missing data.');
    }

    const { startDate, endDate } = schedule;
    const relevantWeekDayCell = this.weekDayCells.find(
      (weekDayCell: ElementRef) =>
        this.isWeekDatCellRelevant(weekDayCell, schedule)
    );
    const relevantHourCell = this.hourCells.find((hourCell: ElementRef) =>
      this.isHourDatCellRelevant(hourCell, schedule)
    );

    if (!relevantWeekDayCell || !relevantHourCell) {
      throw new Error('Unable to find relevant cells.');
    }

    const left = this.calculateLeftPosition(relevantWeekDayCell);
    const width = this.calculateWidth(relevantWeekDayCell);
    const top = this.calculateTopPosition(relevantHourCell, startDate!);
    const height = this.calculateHeight(relevantHourCell, startDate!, endDate!);

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
    schedule: Schedule
  ) {
    const timeCellData = this.getHoursCellData(timeCell);
    const hour = schedule.startDate!.getHours();
    return timeCellData.hour === hour;
  }

  private getHoursCellData(timeCell: ElementRef): {
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
    schedule: Schedule
  ) {
    const weekDayCellData = this.getWeekDayCellData(weekDayCell);
    const dayOfMonth = schedule.startDate!.getDate();
    const dayOfWeek = this.schedulerService.getWeekDayName(
      schedule.startDate!
    );

    return (
      weekDayCellData.dayOfWeek === dayOfWeek &&
      weekDayCellData.dayOfMonth === dayOfMonth
    );
  }

  private getWeekDayCellData(weekDayCell: ElementRef): DayWithDate {
    const weekDayCellData = weekDayCell.nativeElement.innerText
      .trim()
      .split(/\s+/);
    return {
      dayOfWeek: weekDayCellData[0],
      dayOfMonth: parseInt(weekDayCellData[1]),
    };
  }
}
