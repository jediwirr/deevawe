import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'eventIcon',
})
export class EventIcon implements PipeTransform {
	private readonly patchEventIcons = '../../../assets/icons/event/';

	public transform(type: number): string {
		switch (type) {
			case 2: {
				return `${this.patchEventIcons}drunk.svg`;
			}

			case 3: {
				return `${this.patchEventIcons}cool.svg`;
			}

			case 4: {
				return `${this.patchEventIcons}explore.svg`;
			}

			case 5: {
				return `${this.patchEventIcons}relax.svg`;
			}

			case 6: {
				return `${this.patchEventIcons}sport.svg`;
			}

			case 7: {
				return `${this.patchEventIcons}study.svg`;
			}

			case 8: {
				return `${this.patchEventIcons}travel.svg`;
			}

			case 9: {
				return `${this.patchEventIcons}work.svg`;
			}

			case 10: {
				return `${this.patchEventIcons}party.svg`;
			}

			default:
				return `${this.patchEventIcons}standart.svg`;
		}
	}
}
