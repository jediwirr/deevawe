import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
})
export class DatePickerComponent implements OnInit {
  @Output() eventDate = new EventEmitter();

  public isShowCalendar = false;

  public date!: string;

  public defaultTime = [18, 0];

  public momentDate = moment();

  private time: string[] = [];

  public ngOnInit(): void {
    this.date = this.momentDate.format('L');
  }

  public showOrHideCalendar(): void {
    this.isShowCalendar = !this.isShowCalendar;
  }

  public setTime(time: string[]): void {
    this.time = time;
  }

  private createIsoDate(date: moment.Moment, time?: string[]): void {
    const currentDate = moment(date);
  }

  public setDate(date: moment.Moment): void {
    if (!date) {
      this.isShowCalendar = false;
      return;
    }
    this.date = date.format('L');
    this.createIsoDate(date);
  }
}
