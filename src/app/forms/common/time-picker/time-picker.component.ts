import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css'],
})
export class TimePickerComponent implements OnInit {
  hours: string[] = [];
  minutes: string[] = [];
  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#424242',
      buttonColor: '#fff',
    },
    dial: {
      dialBackgroundColor: '#555',
    },
    clockFace: {
      clockFaceBackgroundColor: '#555',
      clockHandColor: '#9fbd90',
      clockFaceTimeInactiveColor: '#fff',
    },
  };

  @Input()
  label: string = '';
  @Input()
  timeValue: string = '';

  constructor() {
    this.hours = this.generateTimeArray(24);
    this.minutes = this.generateTimeArray(60);
  }

  ngOnInit() {}

  private generateTimeArray(limit: number): string[] {
    return Array.from({ length: limit }, (_, i) => (i < 10 ? `0${i}` : `${i}`));
  }

  formatTime() {
    let inputTime: string = this.timeValue;

    if (inputTime.length === 2 && inputTime.indexOf(':') === -1) {
      this.timeValue = inputTime + ':';
    } else if (inputTime.length === 5) {
      return;
    } else {
      this.timeValue = '';
    }
  }
}
