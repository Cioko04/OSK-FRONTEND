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
import { SchedulePlaceholderPositionService } from './schedule-placeholder-position.service';
import { InstructorService } from 'src/app/shared/services/instructor/instructor.service';
import { User } from 'src/app/shared/services/user/user';

@Component({
  selector: 'app-schedule-placeholder',
  templateUrl: './schedule-placeholder.component.html',
  styleUrl: './schedule-placeholder.component.css',
})
export class SchedulePlaceholderComponent implements AfterViewInit {
  @ViewChild('schedulePlaceholder') schedulePlaceholder!: ElementRef;

  @Input()
  schedule!: Schedule;

  @Output()
  onEdit: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private schedulePlaceholderPositionService: SchedulePlaceholderPositionService,
    private renderer: Renderer2,
    private instructorService: InstructorService
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
        this.schedulePlaceholderPositionService.calculateSchedulePlaceholderPosition(
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
      !!this.schedulePlaceholderPositionService.hourCells &&
      this.schedulePlaceholderPositionService.hourCells.length > 0 &&
      !!this.schedulePlaceholderPositionService.weekDayCells &&
      this.schedulePlaceholderPositionService.weekDayCells.length > 0
    );
  }

  editSchedule() {
    this.onEdit.emit(this.schedule);
  }

  getInstructorName(instructor: User): string {
    return this.instructorService.getInstructorName(instructor);
  }
}
