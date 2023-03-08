import { SubscribeBodyEvent } from './subscribe-event';

type DeleteEvent = Omit<SubscribeBodyEvent, 'subscribe'>;
type OmitParamsAddEvent = Omit<ParamsAddEvent, 'time_zone'>;

interface Occasion extends OmitParamsAddEvent {
  event_id: number;
  // created_time: string;
  // updated_time: string;
  // subscribe?: boolean;
}

interface Occasions {
  count: number;
  events: Occasion[];
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
  time_zone: string;
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

interface SearchParamsByUserId {
  val: number;
  sort: string;
  limit: number;
  user_id: number;
}

interface SearchParamsEventBySubscription extends SearchParamsByUserId {}

export {
  DeleteEvent,
  ParamsAddEvent,
  Occasion,
  SearchParams,
  Occasions,
  SearchParamsByUserId,
  SearchParamsEventBySubscription,
};
