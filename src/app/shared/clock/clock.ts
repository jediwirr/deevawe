import { Component, Input, OnInit, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.style.scss'],
})
export class ClockComponent implements OnInit {
  @Input() time!: number[];

  @ViewChildren('refTime') valueTime!: HTMLInputElement;

  public hours: string[] = [];

  public minutes: string[] = [];

  public isShowPickTime = false;

  public ngOnInit(): void {
    this.createHoursTime();
    this.createMinutesTime();
  }

  public setTime(index: number, indexTime: number): void {
    this.time[index] = indexTime;
  }

  public setShowPickTime(): void {
    this.isShowPickTime = !this.isShowPickTime;
  }

  private createHoursTime() {
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
