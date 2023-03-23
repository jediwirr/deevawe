import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'timer',
	pure: false,
})
export class Timer implements PipeTransform {
	public transform(
		hours: string[],
		minutes: string[],
		indexes: number[]
	): string {
		return `${hours[indexes[0]]}:${minutes[indexes[1]]}`;
	}
}
