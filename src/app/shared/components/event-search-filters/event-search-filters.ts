import { Subject, takeUntil } from 'rxjs';
import { Component, EventEmitter, OnDestroy, OnInit, Output, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { WebsocketService } from 'src/app/core/services/websocket/websocket.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { DatePickerModalComponent } from '../../modal/date-picker-wrapper/date-picker-modal';
import { ClockModalComponent } from '../../modal/clock-modal/clock.modal';
import { MapModalComponent } from '../../modal/map-modal/map-modal';
import * as moment from 'moment';

@Component({
	selector: 'app-event-search-filters',
	templateUrl: './event-search-filters.html',
	styleUrls: ['./event-search-filters.scss'],
})
export class EventSearchFiltersComponent implements OnInit, OnDestroy {



	@ViewChild('modalForm', { read: ViewContainerRef })
	modalForm!: ViewContainerRef;

	private destroy$ = new Subject<void>();
	public events: any;
	public date!: any;
	public unixDate!: any;
	public dateNow = new Date();
	public today = moment(this.dateNow).format();
	public timeSelectNow!: any;
	public timeNow = moment().hour()

	@Output() eventsArr = new EventEmitter();

	constructor(private wsService: WebsocketService,
		private modalService: ModalService,) { }



	public ngOnInit(): void {
		console.log(this.timeNow)
	}


	public getEvents() {
		this.wsService.send({
			method: "new",
			body: {
				min: 600,
				time_start:1694244600,
				lat: 59.80228462,
				lon: 30.37665965,
				radius: 1000
			}
		})
		this.wsService.on()
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: val => {
					const response = JSON.parse(val)
					this.eventsArr.emit(response)
				}
			})
	}

	public openModal(type: string) {
		switch (type) {

			case 'time':
				this.modalService.openModal(this.modalForm, undefined, DatePickerModalComponent)
					.subscribe({
						next: (val: any) => {
							this.date = val.date;
							this.unixDate = +moment(this.date).format('X');
						}
					})
				break;

			case 'clock':
				this.modalService.openModal(this.modalForm, undefined, ClockModalComponent)
					.subscribe({
						next: (val: any) => {
							this.timeSelectNow = val.time;
							console.log(this.timeSelectNow * 60)
						}
					})
				break;

			case 'location':
				this.modalService.openModal(this.modalForm, undefined, MapModalComponent)
				break;
			default:
				break;
		}
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

}
