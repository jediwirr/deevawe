import { Occasion } from 'src/app/core/interfaces/events';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EventsService } from '../../../core/services/events/events.service';
import { LocalStorageService } from '../../../core/services/localStorage.service';
import { ModalComponent } from '../modal-base';

@Component({
	templateUrl: './event.component.html',
	styleUrls: ['./event.style.scss'],
})
export class EventFormComponent extends ModalComponent implements OnInit {
	@Input() inputData?: Occasion;

	public readonly listTypeEvent = [
		{
			type: 'drink',
			name: 'Выпить',
		},
	];

	public isShowMap = false;

	public isShowEndDate = false;

	public eventForm = new FormGroup({
		title: new FormControl<string>('', { nonNullable: true }),
		description: new FormControl<string>('', { nonNullable: true }),
		geolocation: new FormControl<{
			lat: number;
			lon: number;
		}>(
			{
				lat: 0,
				lon: 0,
			},
			{ nonNullable: true }
		),
		startDate: new FormControl<string>('', { nonNullable: true }),
		endDate: new FormControl<string>('', { nonNullable: true }),
	});

	constructor(
		private localStorageService: LocalStorageService,
		private eventsService: EventsService
	) {
		super();
	}

	public ngOnInit(): void {
		if (this.inputData) {
			console.log(this.inputData);
			// const { title, description, time_end} = this.infoEvent;
			// this.eventForm.setValue({
			//   title,
			//   description,
			//   endDate:
			// })
		}
	}

	public showOrHideMap(): void {
		this.isShowMap = !this.isShowMap;
	}

	public showOrHideEndDate(): void {
		this.isShowEndDate = !this.isShowEndDate;
	}

	public getCoordinates(coordinates: number[] | undefined): void {
		if (!coordinates) {
			this.showOrHideMap();
			return;
		}
		this.eventForm.controls.geolocation.setValue({
			lat: coordinates[0],
			lon: coordinates[1],
		});
	}

	public setOptionSelect(selectValue: string | undefined): void {
		// this.eventForm.controls.
	}

	public setDate(): void {}

	public async submitEvent(): Promise<void> {
		// if (!this.eventForm.valid) {
		//   return;
		// }
		const userId = await this.localStorageService.getUserId();
		const { title, description, geolocation } = this.eventForm.controls;
		this.eventsService
			.addOrUpdateEvent(
				{
					userId: userId,
					title: title.value,
					description: description.value,
					type: 1,
					status: 2,
					longitude: geolocation.value.lon,
					latitude: geolocation.value.lat,
					timeStart: 1664542280,
					time_end: 1664542282,
					timeZone: 'Europe/Astrakhan',
				},
				'put'
			)
			.subscribe(() => {
				this.eventsService.searchById({
					limit: 1,
					sort: 'id',
					userId: userId,
					val: userId,
				});
			});
		this.destroyModal();
	}

	public destroyModal(): void {
		this.closeModal.emit();
	}
}
