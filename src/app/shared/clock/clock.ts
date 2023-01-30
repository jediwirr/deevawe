import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockComponent implements OnInit {
  public timeStart!: string;

  public timeEnd!: string;

  public hours: string[] = [];

  public minutes: string[] = [];

  public ngOnInit(): void {
    const timeStart = moment().startOf('day');
    this.timeEnd = moment().endOf('day').format('HH');
    const timeMinuteStart = moment().startOf('hour');
    const timeMinuteEnd = moment().endOf('hour');
    console.log(timeMinuteEnd.format('mm'));

    let i = 0;
    while (i <= parseInt(this.timeEnd, 10)) {
      if (i === 0) {
        this.hours.push(timeStart.format('HH'));
      } else {
        timeStart.add(1, 'hour');
        this.hours.push(timeStart.format('HH'));
      }
      i += 1;
    }
    this.createMinuteTime(timeMinuteStart, timeMinuteEnd);
  }

  private createMinuteTime(start: moment.Moment, end: moment.Moment) {
    let i = 0;
    while (i <= parseInt(end.format('mm'), 10)) {
      if (i === 0) {
        this.minutes.push(start.format('mm'));
      } else {
        start.add(1, 'minute');
        this.minutes.push(start.format('mm'));
      }
      i += 1;
    }
  }
}
