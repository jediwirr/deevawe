import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Occasion } from 'src/app/core/interfaces/events';
import { ModalService } from '../../../core/services/modal.service';
import { EventsService } from '../../../core/services/events/events.service';
import { EventFormComponent } from '../../modal/event/event';

@Component({
	selector: 'app-card-event',
	templateUrl: './card-events.component.html',
	styleUrls: ['./card-events.style.scss'],
})
export class CardEventComponent {
	@Input() event!: Occasion;

	@ViewChild('modalFormEvent', { read: ViewContainerRef })
	modalFormEvent!: ViewContainerRef;

	constructor(
		private eventsService: EventsService,
		private modalService: ModalService
	) { }

	public deleteEvent(): void {
		this.eventsService
			.deleteEvent({
				user_id: this.event.userId,
				event_id: this.event.eventId,
			})
			.subscribe((result) => {
				if (result.success) {
					this.eventsService.searchById(this.event.userId);
				}
			});
	}

	public updateEvent(): void {
		this.modalService.openModal(
			this.modalFormEvent,
			{
				...this.event,
			},
			EventFormComponent,

		).subscribe(() => {
			this.modalService.destroyModal();
		});
	}
}
