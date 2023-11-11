import { Subject, takeUntil } from 'rxjs';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { WebsocketService } from 'src/app/core/services/websocket/websocket.service';

@Component({
	selector: 'app-event-search-filters',
	templateUrl: './event-search-filters.html',
	styleUrls: ['./event-search-filters.scss'],
})
export class EventSearchFiltersComponent implements OnInit, OnDestroy {


	private destroy$ = new Subject<void>();
	public events: any;

	@Output() eventsArr = new EventEmitter();

	constructor(private wsService: WebsocketService) { }



	public ngOnInit(): void { }

	public getEvents() {
		this.wsService.send({
			method: "new",
			body: {
				min: 600,
				time_start: 1694244600,
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

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

}
