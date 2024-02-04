import { ElementRef, Injectable, QueryList } from '@angular/core';
import { ScheduledTime } from './scheduler.component';
import { DayWithDate, SchedulerService } from './scheduler.service';

export interface SchedulPosition {
  left: number,
  width: number,
  top: number,
  height: number
}

@Injectable({
  providedIn: 'root',
})
export class SchedulPositionService {
  scheduledTimes: ScheduledTime[] = [
    {
      id: 1,
      instruktor: 'Jacek',
      startTime: new Date(2024, 1, 3, 12, 30),
      endTime: new Date(2024, 1, 3, 15, 15),
    },
    {
      id: 2,
      instruktor: 'Andrzej',
      startTime: new Date(2024, 1, 2, 9, 0),
      endTime: new Date(2024, 1, 2, 11, 30),
    },
  ];

  constructor(private schedulerService: SchedulerService) {}

  calculateSchedulPosition(schedul: ElementRef, weekDayCells: QueryList<ElementRef>, hourCells: QueryList<ElementRef>): SchedulPosition {
    if (!schedul || !weekDayCells || !hourCells) {
        throw new Error("Invalid input or missing data.");
    }

    const scheduledTime = this.scheduledTimes.find((scheduledTime) => scheduledTime.id === parseInt(schedul.nativeElement.id))!;
    const { startTime, endTime } = scheduledTime;

    const relevantWeekDayCell = weekDayCells.find((weekDayCell: ElementRef) => this.isWeekDatCellRelevant(weekDayCell, scheduledTime));
    const relevantHourCell = hourCells.find((hourCell: ElementRef) => this.isHourDatCellRelevant(hourCell, scheduledTime));

    if (!relevantWeekDayCell || !relevantHourCell) {
        throw new Error("Unable to find relevant cells.");
    }

    const left = this.calculateLeftPosition(relevantWeekDayCell);
    const width = this.calculateWidth(relevantWeekDayCell);
    const top = this.calculateTopPosition(relevantHourCell, startTime);
    const height = this.calculateHeight(relevantHourCell, startTime, endTime);

    return { left, width, top, height };
}

private calculateLeftPosition(cell: ElementRef): number {
  return cell.nativeElement.offsetLeft;
}

private calculateWidth(cell: ElementRef): number {
  return cell.nativeElement.offsetWidth;
}

private calculateTopPosition(cell: ElementRef, startTime: Date): number {
  const timeCellHeight = cell.nativeElement.offsetHeight;
  const startMinutes = startTime.getMinutes();
  return cell.nativeElement.offsetTop + (timeCellHeight * startMinutes / 60);
}

private calculateHeight(cell: ElementRef, startTime: Date, endTime: Date): number {
  const timeCellHeight = cell.nativeElement.offsetHeight;
  const startHour = startTime.getHours();
  const startMinutes = startTime.getMinutes();
  const endHour = endTime.getHours();
  const endMinutes = endTime.getMinutes();
  return timeCellHeight * ((endHour - startHour) + ((endMinutes - startMinutes) / 60));
}

  private isHourDatCellRelevant(timeCell: ElementRef, scheduledTime: ScheduledTime) {
    const timeCellData  = this.getHursCellData(timeCell);
    const hour = scheduledTime.startTime.getHours();
    return timeCellData.hour === hour;
  }

  private getHursCellData(timeCell: ElementRef): {hour: number, minutes: number} {
    const timeCellData = timeCell.nativeElement.innerText.trim().split(':');
    return {
      hour: parseInt(timeCellData[0]),
      minutes: parseInt(timeCellData[1])
    }
      
  }

  private isWeekDatCellRelevant(weekDayCell: ElementRef, scheduledTime: ScheduledTime) {
    const weekDayCellData  = this.getWeekDayCellData(weekDayCell);
    const dayOfMonth = scheduledTime.startTime.getDate();
    const dayOfWeek = this.schedulerService.getWeekDayName(scheduledTime.startTime);
    return weekDayCellData.dayOfWeek === dayOfWeek && weekDayCellData.dayOfMonth === dayOfMonth;
  }

  private getWeekDayCellData(weekDayCell: ElementRef): DayWithDate {
    const weekDayCellData = weekDayCell.nativeElement.innerText.trim().split(/\r?\n/);
    return {
      dayOfWeek: weekDayCellData[0],
      dayOfMonth: parseInt(weekDayCellData[1])
    }
  }
}
