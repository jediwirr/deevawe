interface SubscribeBodyEvent {
  user_id: number;
  event_id: number;
  subscribe: boolean;
}

interface SubscribeConfirmEvent extends SubscribeBodyEvent {
  confirm: boolean;
}

export { SubscribeBodyEvent, SubscribeConfirmEvent };
