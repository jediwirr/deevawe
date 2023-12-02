import { map, Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { SuccessReturn } from '../../interfaces/api';
import {
	DeleteEvent,
	Occasion,
	Occasions,
	ParamsAddEventRes,
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
		paramsAddEvent: ParamsAddEventRes,
		method: 'put' | 'path'
	): Observable<Occasion> {
		return this.sendRequest<ParamsAddEventRes, Occasion>(
			'event',
			method,
			paramsAddEvent
		).pipe(map((occasion) => occasion));
	}

	public searchById(id: number): void {
		this.sendGetRequest<null, Occasions>(`events/user?val=${id}`).subscribe((occasion) => {
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
