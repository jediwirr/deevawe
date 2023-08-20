import { SubscribeBodyEvent } from './subscribe-event';

type DeleteEvent = Omit<SubscribeBodyEvent, 'subscribe'>;
type OmitParamsAddEvent = Omit<ParamsAddEvent, 'timeZone'>;
type PickRename<T, K extends keyof T, R extends PropertyKey> = Omit<T, K> & {
	[P in R]: T[K];
};

interface Occasion extends OmitParamsAddEvent {
	eventId: number;
	// created_time: string;
	// updated_time: string;
	// subscribe?: boolean;
}

interface Occasions {
	count: number;
	events: Occasion[];
}

interface ParamsAddEvent {
	userId: number;
	title: string;
	description: string;
	type: number;
	status: number;
	longitude: number;
	latitude: number;
	timeStart: number;
	timeEnd: number;
	timeZone: string;
}

type ParamsAddEventRes = PickRename<
	ParamsAddEvent,
	'userId' | 'timeStart' | 'timeEnd' | 'timeZone',
	'time_start' | 'time_end' | 'time_zone' | 'user_id'
>;

interface SearchParams {
	type: number;
	minutes: number;
	value: number;
	lat: number;
	lon: number;
	radius: number;
	sort: string;
	limit: number;
	userId: number;
}

interface SearchParamsByUserId {
	val: number;
	sort: string;
	limit: number;
	userId: number;
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
	ParamsAddEventRes,
};
