import { BehaviorSubject } from 'rxjs';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  Input,
} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.style.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  @Input() currentStartDate!: moment.Moment;

  @Output() emitSelectedDate = new EventEmitter<moment.Moment>();

  public date!: BehaviorSubject<moment.Moment>;

  public weekDaysHeaderArr: string[] = [];

  public gridArr: { value: number }[] = [];

  public canChangePrev = false;

  public month!: string;

  public year!: string;

  public selectedDate!: moment.Moment;

  public ngOnInit(): void {
    if (!this.currentStartDate) {
      this.currentStartDate = moment();
    }

    this.date = new BehaviorSubject(moment());

    this.makeHeader();
    this.makeGrid();
    this.date.subscribe((date) => {
      this.month = date.format('MMMM');
      this.year = date.format('YYYY');
      this.isChangePrev();
    });
  }

  private isChangePrev(): void {
    if (this.currentStartDate.format('YYYY') === this.year) {
      if (this.currentStartDate.format('MMMM') !== this.month) {
        this.canChangePrev = true;
      } else {
        this.canChangePrev = false;
      }
    } else {
      this.canChangePrev = true;
    }
  }

  public nextMonth(num: number): void {
    this.date.next(this.date.value.add(num, 'month'));
    this.makeGrid();
  }

  public prevMonth(num: number): void {
    if (!this.canChangePrev) {
      return;
    }
    this.date.next(this.date.value.subtract(num, 'month'));
    this.makeGrid();
  }

  public makeHeader(): void {
    const weekDays = [0, 1, 2, 3, 4, 5, 6];
    weekDays.forEach((day) =>
      this.weekDaysHeaderArr.push(moment().weekday(day).format('ddd'))
    );
  }

  public makeGrid(): void {
    this.gridArr = [];

    const firstDayDate = moment(this.date.value).startOf('month');
    const initialEmptyCells = firstDayDate.weekday();
    const lastDayDate = moment(this.date.value).endOf('month');
    const lastEmptyCells = 6 - lastDayDate.weekday();
    const daysInMonth = this.date.value.daysInMonth();
    const arrayLength = initialEmptyCells + lastEmptyCells + daysInMonth;

    let i = 0;

    while (i < arrayLength) {
      const obj: any = {};
      if (i < initialEmptyCells || i > initialEmptyCells + daysInMonth - 1) {
        obj.value = 0;
      } else {
        obj.value = i - initialEmptyCells + 1;
      }
      this.gridArr.push(obj);
      i += 1;
    }
  }

  public ngOnDestroy(): void {
    this.date.unsubscribe();
  }

  private dateFromNum(
    num: number,
    referenceDate: moment.Moment
  ): moment.Moment {
    const returnDate = moment(referenceDate);
    return returnDate.date(num);
  }

  public selectDay(day: { value: number }): void {
    this.selectedDate = this.dateFromNum(day.value, this.date.value);
    this.emitSelectedDate.emit(moment(this.selectedDate));
  }
}
