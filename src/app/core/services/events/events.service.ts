import { Injectable } from '@angular/core';
import { SuccessReturn } from '../../interfaces/api';
import {
  DeleteEvent,
  Occasion,
  Occasions,
  ParamsAddEvent,
  SearchParams,
} from '../../interfaces/events';
import { Api } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class EventsService extends Api {
  public async deleteEvent(
    paramsDeleteEvent: DeleteEvent
  ): Promise<SuccessReturn> {
    const result = this.sendRequest<DeleteEvent, SuccessReturn>(
      'event',
      'delete',
      paramsDeleteEvent
    );
    return result;
  }

  public async addOrUpdateEvent(
    paramsAddEvent: ParamsAddEvent,
    method: 'put' | 'path'
  ): Promise<Occasion> {
    const result = await this.sendRequest<ParamsAddEvent, Occasion>(
      'event',
      method,
      paramsAddEvent
    );
    return result;
  }

  public async searchEvents(searchParams: SearchParams): Promise<Occasions> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { type, lat, limit, lon, minutes, radius, sort, user_id, value } =
      searchParams;
    const url = `events?type=${type}&minutes=${minutes}&value=${value}&lat=${lat}&lon=${lon}&radius=${radius}&sort=${sort}&limit=${limit}&user_id=${user_id}`;
    const result = this.sendRequest<null, Occasions>(url, 'get');
    return result;
  }
}
