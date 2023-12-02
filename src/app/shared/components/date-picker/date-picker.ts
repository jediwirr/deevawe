import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { ModalComponent } from '../../modal/modal-base';


@Component({
	selector: 'app-date-picker',
	templateUrl: './date-picker.component.html',
	styleUrls: ['./date-picker.style.scss'],
})
export class DatePickerComponent implements OnInit {
	@Output() eventDate = new EventEmitter<{
		date:string
		unixDate:string
	}>();


	public isShowCalendar = false;

	public date!: string;

	public defaultTime = [18, 0];

	public momentDate = moment();

	private time: string[] = [];

	public ngOnInit(): void {
		this.date = this.momentDate.format();
	}

	public showOrHideCalendar(): void {
		this.isShowCalendar = !this.isShowCalendar;
	}

	private unixDate(date:any, time?: string[]): number {
		const currentDate = moment(this.momentDate).unix();
		return currentDate
	}

	public setDate(date: moment.Moment): void {

		if (!date) {
			this.isShowCalendar = false;
			return;
		}
		

		this.date = date.format();
		const unix = moment(date).format('L')
		this.eventDate.emit({
			date:this.date,
			unixDate:unix
		});
		this.isShowCalendar = false;
	}
}
