import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
	name: 'timer',
	pure: false,
})
export class Timer implements PipeTransform {
	public transform(
		value: any,
		format?: any
	): string {

		return moment(value).calendar( {
			sameDay: '[Сегодня]',
			nextDay: '[Завтра]',
			nextWeek: 'DD.MM.YYYY',
			lastDay: '[Вчера]',
			lastWeek: 'DD.MM.YYYY',
			sameElse: 'DD.MM.YYYY'
		});

	}
}
