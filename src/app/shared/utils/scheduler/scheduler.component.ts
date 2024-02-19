import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { List } from '../../core/list';
import { Schedule } from '../../services/schedule/schedule';
import { ScheduleService } from '../../services/schedule/schedule.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css'],
})
export class SchedulerComponent extends List implements OnInit, OnDestroy {
  schedules: Schedule[] = [];
  private dataSubscription: Subscription = new Subscription();

  constructor(modalService: NgbModal, private scheduleService: ScheduleService) {
    super(modalService);
  }

  ngOnInit() {
    this.initSubscription();
  }

  private initSubscription() {
    this.dataSubscription.add(
      this.scheduleService.scheduleSubject$.subscribe((schedules) => {
        if (this.schedules !== schedules) {
          this.schedules = schedules;
        }
      })
    );
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  override onDelete(id: number): void {
    throw new Error('Method not implemented.');
  }

  override onSubmit(item: any): void {
    throw new Error('Method not implemented.');
  }

  override update(): void {
    throw new Error('Method not implemented.');
  }

  override add(): void {
    throw new Error('Method not implemented.');
  }
}
