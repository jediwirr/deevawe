import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.style.scss'],
})
export class ClockComponent implements OnInit, AfterViewInit {
  @Input() time!: number[];

  @ViewChild('refTime') valueTime!: ElementRef<HTMLInputElement>;

  @Output() emitTime = new EventEmitter();

  public hours: string[] = [];

  public minutes: string[] = [];

  public currentHour = moment().hour();

  public currentMinutes = '00';

  public isShowPickTime = false;

  public decrementOrIncrementTime(
    typeTime: 'HOUR' | 'MINUTE',
    type: 'INCREMENT' | 'DECREMENT'
  ): void {
    if (typeTime === 'HOUR') {
      if (type === 'DECREMENT') {
        this.currentHour = moment(this.currentHour).subtract('hour').hour();
      } else {
        this.currentHour = moment(this.currentHour).add('hour').hour();
      }
    }

    if (typeTime === 'MINUTE') {
      if (type === 'DECREMENT') {
        this.currentMinutes = (
          parseInt(this.currentMinutes, 10) - 15
        ).toString();
        if (this.currentMinutes === '0') {
          this.currentMinutes = '00';
        }
      } else {
        this.currentMinutes = (
          parseInt(this.currentMinutes, 10) + 15
        ).toString();
      }
    }
  }

  public ngOnInit(): void {
    this.createHoursTime();
    this.createMinutesTime();
  }

  public ngAfterViewInit(): void {
    this.emitTime.emit([
      this.valueTime.nativeElement.value.substring(0, 2),
      this.valueTime.nativeElement.value.substring(3, 5),
    ]);
  }

  public setTime(index: number, indexTime: number): void {
    this.time[index] = indexTime;

    this.emitTime.emit([
      this.valueTime.nativeElement.value.substring(0, 2),
      this.valueTime.nativeElement.value.substring(3, 5),
    ]);
  }

  public setShowPickTime(): void {
    this.isShowPickTime = !this.isShowPickTime;
  }

  private createHoursTime() {
    console.log(moment().hour());

    moment().hour();
    let index = 0;
    while (index < 24) {
      if (index <= 9) {
        this.hours.push(`0${index}`);
        index += 1;
        // eslint-disable-next-line no-continue
        continue;
      }
      this.hours.push(`${index}`);
      index += 1;
    }
  }

  private createMinutesTime() {
    let index = 0;
    while (index <= 3) {
      if (index === 0) {
        this.minutes.push('00');
        index += 1;
        // eslint-disable-next-line no-continue
        continue;
      }
      this.minutes.push((15 * index).toString());
      index += 1;
    }
  }
}
