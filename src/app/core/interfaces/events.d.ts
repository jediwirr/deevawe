import { ErrorApiResponse } from './api';
import { SubscribeBodyEvent } from './subscribe-event';
import { TimeZones } from './time-zones';

type DeleteEvent = Omit<SubscribeBodyEvent, 'subscribe'>;
type OmitParamsAddEvent = Omit<ParamsAddEvent, 'time_zone'>;

interface Occasion extends OmitParamsAddEvent {
    created_time: string;
    updated_time: string;
    subscribe?: boolean;
}

interface Occasion extends ErrorApiResponse {}

interface Occasions {
    count: number;
    events: OmitParamsAddEvent[]
}

interface ParamsAddEvent {
  user_id: number;
  title: string;
  description: string;
  type: number;
  status: number;
  longitude: number;
  latitude: number;
  time_start: number;
  time_end: number;
  time_zone: TimeZones;
}

interface SearchParams {
    type: number;
    minutes: number;
    value: number;
    lat: number;
    lon: number;
    radius: number;
    sort: string;
    limit: number;
    user_id: number;
}

export { DeleteEvent, ParamsAddEvent, Occasion, SearchParams, Occasions };
