import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
})
export class DatePickerComponent implements OnInit {
  public isShowCalendar = false;

  public date!: string;

  public defaultTime = [18, 0];

  public momentDate = moment();

  public ngOnInit(): void {
    this.date = this.momentDate.format('L');
  }

  public showOrHideCalendar(): void {
    this.isShowCalendar = !this.isShowCalendar;
  }

  public setDate(date: string): void {
    if (!date) {
      this.isShowCalendar = false;
      return;
    }
    this.date = date;
  }
}
