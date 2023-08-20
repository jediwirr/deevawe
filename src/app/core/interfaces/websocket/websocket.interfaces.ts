import { Observable } from "rxjs";

interface WebSocketConfig {
    url: string;
    reconnectInterval?: number;
    reconnectAttempts?: number;
}

interface IWebsocketService {
    on<T>(event: string): Observable<T>;
    send(event: string, data: any): void;
    status: Observable<boolean>;
}

interface IWsMessage<T> {
    event: string;
    data: T;
}

export { WebSocketConfig, IWebsocketService, IWsMessage};
