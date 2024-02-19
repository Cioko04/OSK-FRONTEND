import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Schedule } from 'src/app/shared/services/schedule/schedule';
import { SchedulePositionService } from './schedule-position.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css',
})
export class ScheduleComponent implements AfterViewInit {
  @ViewChild('schedulePlaceholder') schedulePlaceholder!: ElementRef;

  @Input()
  schedule!: Schedule;

  @Output()
  onEdit = new EventEmitter<any>();

  constructor(
    private sessionPositionService: SchedulePositionService,
    private renderer: Renderer2
  ) {}

  @HostListener('window:resize')
  onResize() {
    this.setPosition();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setPosition();
    });
  }

  private setPosition() {
    if (this.shouldCalculatePosition()) {
      const schedulPosition =
        this.sessionPositionService.calculateSchedulePosition(
          this.schedulePlaceholder,
          this.schedule
        );
      this.renderer.setStyle(
        this.schedulePlaceholder.nativeElement,
        'left',
        schedulPosition.left + 'px'
      );
      this.renderer.setStyle(
        this.schedulePlaceholder.nativeElement,
        'width',
        schedulPosition.width - 30 + 'px'
      );
      this.renderer.setStyle(
        this.schedulePlaceholder.nativeElement,
        'margin-left',
        15 + 'px'
      );
      this.renderer.setStyle(
        this.schedulePlaceholder.nativeElement,
        'top',
        schedulPosition.top + 'px'
      );
      this.renderer.setStyle(
        this.schedulePlaceholder.nativeElement,
        'height',
        schedulPosition.height + 'px'
      );
    }
  }

  private shouldCalculatePosition(): boolean {
    return (
      !!this.schedulePlaceholder &&
      !!this.sessionPositionService.hourCells &&
      this.sessionPositionService.hourCells.length > 0 &&
      !!this.sessionPositionService.weekDayCells &&
      this.sessionPositionService.weekDayCells.length > 0
    );
  }

  editSchedule() {
    this.onEdit.emit(this.schedule);
  }
}
