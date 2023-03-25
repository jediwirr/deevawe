import { Injectable } from '@angular/core';
import { SuccessReturn } from '../../../interfaces/api';
import {
	SubscribeBodyEvent,
	SubscribeConfirmEvent,
} from '../../../interfaces/subscribe-event';
import { Api } from '../../api.service';

@Injectable({
	providedIn: 'root',
})
export class SubscribeEventService extends Api {
	public async subscribe(
		subscribeEventData: SubscribeBodyEvent
	): Promise<SuccessReturn> {
		const result = await this.sendPostRequest<
			SubscribeBodyEvent,
			SuccessReturn
		>('subscribe_event', subscribeEventData);
		return result;
	}

	public async confirm(
		confirmSubscribeEvent: SubscribeConfirmEvent
	): Promise<SuccessReturn> {
		const result = await this.sendPostRequest<
			SubscribeConfirmEvent,
			SuccessReturn
		>('confirm_subscribe', confirmSubscribeEvent);
		return result;
	}
}
