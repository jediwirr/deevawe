import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Occasion } from 'src/app/core/interfaces/events';
import { ModalService } from '../../../core/services/modal.service';
import { EventsService } from '../../../core/services/events/events.service';
import { EventFormComponent } from '../../modal/event/event';

@Component({
	selector: 'app-card-event',
	templateUrl: './card-events.component.html',
})
export class CardEventComponent {
	@Input() event!: Occasion;

	@ViewChild('modalFormEvent', { read: ViewContainerRef })
	modalFormEvent!: ViewContainerRef;

	constructor(
		private eventsService: EventsService,
		private modalService: ModalService
	) {}

	public deleteEvent(): void {
		this.eventsService
			.deleteEvent({
				user_id: this.event.user_id,
				event_id: this.event.event_id,
			})
			.subscribe((result) => {
				if (result.success) {
					this.eventsService.searchById({
						limit: 1,
						sort: 'id',
						user_id: this.event.user_id,
						val: this.event.user_id,
					});
				}
			});
	}

	public updateEvent(): void {
		this.modalService.injectComponent(
			this.modalFormEvent,
			EventFormComponent,
			{
				...this.event,
			}
		);
		this.modalService.closedModal.subscribe(() => {
			this.modalService.destroyModal();
		});
	}
}
