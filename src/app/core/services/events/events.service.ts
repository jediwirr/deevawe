import { map, Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { SuccessReturn } from '../../interfaces/api';
import {
	DeleteEvent,
	Occasion,
	Occasions,
	ParamsAddEvent,
	SearchParamsByUserId,
	SearchParamsEventBySubscription,
} from '../../interfaces/events';
import { Api } from '../api.service';

@Injectable({
	providedIn: 'root',
})
export class EventsService extends Api {
	public events = new BehaviorSubject(Object.create(null));

	public deleteEvent(
		paramsDeleteEvent: DeleteEvent
	): Observable<SuccessReturn> {
		return this.sendDeleteRequest<DeleteEvent, SuccessReturn>(
			'event',
			paramsDeleteEvent
		).pipe(map((response) => response));
	}

	/**
	 * @deprecated
	 * @param paramsAddEvent
	 * @param method
	 */
	public addOrUpdateEvent(
		paramsAddEvent: ParamsAddEvent,
		method: 'put' | 'path'
	): Observable<Occasion> {
		return this.sendRequest<ParamsAddEvent, Occasion>(
			'event',
			method,
			paramsAddEvent
		).pipe(map((occasion) => occasion));
	}

	public searchById(searchParams: SearchParamsByUserId): void {
		const { val, userId, limit, sort } = searchParams;
		const url = `events/user?val=${val}&sort=${sort}&limit=${limit}&user_id=${userId}`;
		this.sendGetRequest<null, Occasions>(url).subscribe((occasion) => {
			this.events.next(occasion);
		});
	}

	public searchBySubscription(
		searchParams: SearchParamsEventBySubscription
	): Observable<Occasions> {
		const { val, userId, limit, sort } = searchParams;
		const url = `events/subscribe?sort=${sort}&limit=${limit}&user_id=${userId}&val=${val}`;
		return this.sendGetRequest<null, Occasions>(url).pipe(
			map((occasion) => occasion)
		);
	}
}
