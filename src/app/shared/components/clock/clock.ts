import {
	Component,
	OnInit,
	Output,
	EventEmitter,
} from '@angular/core';
import * as moment from 'moment';
import { ModalComponent } from '../../modal/modal-base';


@Component({
	selector: 'app-clock',
	templateUrl: './clock.component.html',
	styleUrls: ['./clock.style.scss'],
})
export class ClockComponent extends ModalComponent implements OnInit {

	@Output() emitTime = new EventEmitter();

	public isOpen = false;
	public inputSelectTime!:string;
	public timeNow: string = moment().format('LT');
	public hourNow: number = moment().hour();
	public hour!: any;
	public show = '12dwd';
	public minute!: any;
	public minutesNow = moment().minute();

	public correctMinutes(): any {
		if (this.minutesNow <= 9) {
			const time = '0' + this.minutesNow;
			return time
		}
	}

	public incrementOrdecrementHourTime(
		typeTime: 'HOUR' | 'MINUTE',
		type: 'INCREMENT' | 'DECREMENT'): void {

		if (typeTime === 'HOUR') {
			if (type === 'INCREMENT') {

				this.hourNow = moment(this.hourNow)
					.add(this.hourNow - 2, 'hour').hour();
				this.hour = this.hourNow;

			}
			if (type === 'DECREMENT') {

				this.hourNow = this.hourNow - 1;
				this.hour = this.hourNow;
				if (this.hourNow < 0) {
					this.hourNow = 23;
					this.hour = this.hourNow;
				}
			}
			this.hourNow;
		}
		if (typeTime === 'MINUTE') {
			if (type === 'INCREMENT') {
				this.minutesNow = moment(this.minutesNow)
					.add(this.minutesNow + 1, 'minute').minute();
				this.minute = this.minutesNow
			}
			if (type === 'DECREMENT') {
				this.minutesNow = this.minutesNow - 1;
				this.minute = this.minutesNow
				if (this.minutesNow < 0) {
					this.minutesNow = 60;
					this.minute = this.minutesNow;
				}
			}
		}
	};

	public selectTime() {
		console.log('hour', this.hour);
		console.log('minute', this.minute);
		this.inputSelectTime=  `${this.hour}:${this.minute}`;

		this.emitTime.emit({
			time: this.hour
		})
		this.isOpen = false;
	}

	public ngOnInit(): void {
		this.hour = this.hourNow;
		this.minute = this.minutesNow;

	}







}
