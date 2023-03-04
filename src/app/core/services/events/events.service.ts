import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SuccessReturn } from '../../interfaces/api';
import {
  DeleteEvent,
  Occasion,
  Occasions,
  ParamsAddEvent,
  SearchParams,
  SearchParamsByUserId,
  SearchParamsEventBySubscription,
} from '../../interfaces/events';
import { Api } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class EventsService extends Api {
  public deleteEvent(
    paramsDeleteEvent: DeleteEvent
  ): Observable<SuccessReturn> {
    return this.sendRequest<DeleteEvent, SuccessReturn>(
      'event',
      'delete',
      paramsDeleteEvent
    ).pipe(map((response) => response));
  }

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

  /**
   *
   * @deprecated
   */
  public searchEvents(searchParams: SearchParams): Observable<Occasions> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { type, lat, limit, lon, minutes, radius, sort, user_id, value } =
      searchParams;
    // types:
    //  1 - Поиск по времени
    // 2 - По юзеру
    // 3 - По подписке
    const url = `events?type=${type}&minutes=${minutes}&value=${value}&lat=${lat}&lon=${lon}&radius=${radius}&sort=${sort}&limit=${limit}&user_id=${user_id}`;
    return this.sendRequest<null, Occasions>(url, 'get').pipe(
      map((occasion) => occasion)
    );
  }

  public searchById(searchParams: SearchParamsByUserId): Observable<Occasions> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { val, user_id, limit, sort } = searchParams;
    const url = `events/user?val=${val}&sort=${sort}&limit=${limit}&user_id=${user_id}`;
    return this.sendRequest<null, Occasions>(url, 'get').pipe(
      map((occasion) => occasion)
    );
  }

  public searchBySubscription(
    searchParams: SearchParamsEventBySubscription
  ): Observable<Occasions> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { val, user_id, limit, sort } = searchParams;
    const url = `events/subscribe?sort=${sort}&limit=${limit}&user_id=${user_id}&val=${val}`;
    return this.sendRequest<null, Occasions>(url, 'get').pipe(
      map((occasion) => occasion)
    );
  }
}
