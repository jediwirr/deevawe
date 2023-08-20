import { Inject, Injectable, OnDestroy } from "@angular/core";
import { distinctUntilChanged, filter, interval, map, Observable, Observer, share, Subject, SubscriptionLike, takeWhile} from "rxjs";
import { WebSocketSubject, WebSocketSubjectConfig } from "rxjs/webSocket";
import { config } from './websocket.config';
import { IWebsocketService, IWsMessage, WebSocketConfig } from "../../interfaces/websocket/websocket.interfaces";

@Injectable({
	providedIn: 'root'
})

export class WebsocketService implements IWebsocketService, OnDestroy {
	private wsMessages!: Subject<IWsMessage<any>>;

	private webSocket!: WebSocketSubject<any>;

	private config!: WebSocketSubjectConfig<IWsMessage<any>>;

	private connection!: Observer<boolean>;

	private reconnection!: Observable<number> | null;

	private statusSubscriber!: SubscriptionLike;

	private wsStatusSubscriber!: SubscriptionLike;

	private isConnected = false;

	private reconnectInterval = 5000;

	private reconnectAttempts = 5;

	public status!: Observable<boolean>;

	constructor(@Inject(config) private wsConfig: WebSocketConfig) {
		this.wsMessages = new Subject<IWsMessage<any>>();

		this.config = {
			url: wsConfig.url,
			closeObserver: {
				next: (event: CloseEvent) => {
					console.log('WS Disconnected');
					this.webSocket.next(null);
					this.connection.next(false);
				}
			},
			openObserver: {
				next: (event: Event) => {
					console.log('WS Connected');
					this.connection.next(true);
				}
			}
		};

		this.connect();

		this.setConnectionStatus();
		this.setReconnectStatus();
	}

	public on<T>(event: string): Observable<T> {
		return this.wsMessages.pipe(
			filter((message: IWsMessage<T>) => message.event === event),
			map((message: IWsMessage<T>) => message.data)
		);
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public send(event: string, data?: any): void {
		// console.log(event, this.isConnected);

		this.webSocket.next(<any>JSON.stringify({ event, data }));

		// if (event && !this.isConnected) {
		// 	console.log(this.webSocket);
		// 	this.webSocket.next(<any>JSON.stringify({ event, data }));


		// } else {
		// 	console.error('Send error!');
		// }
	}

	private setConnectionStatus(): void {
		this.status = new Observable<boolean>((subscriber) => {
			this.connection = subscriber;
		}).pipe(share(), distinctUntilChanged());
	}

	private setReconnectStatus(): void {
		this.statusSubscriber = this.status.subscribe((observer) => {
			this.isConnected = observer;

			if (!this.reconnection && typeof observer === 'boolean' && !observer) {
				this.reconnect();
			}
		});
	}

	private reconnect(): void {
		this.reconnection = interval(this.reconnectInterval)
			.pipe(takeWhile((v, index) => index < this.reconnectAttempts && !this.webSocket));


		this.reconnection.subscribe(
			{
				next: () => this.connect(),
				error: () => null,
				complete: () => {
					// Subject complete if reconnect attemts ending
					this.reconnection = null;
					if (!this.webSocket) {
						this.wsMessages.complete();
						this.connection.complete();
					}
				}
			});
	}

	private connect(): void {
		this.webSocket = new WebSocketSubject(this.wsConfig);

		this.webSocket.subscribe({
			next: (message) => {
				this.wsMessages.next(message);
			},
			error: () => {
				if (!this.webSocket) {
					this.reconnect();
				}
			}
		  });
	}


	public ngOnDestroy(): void {
		this.wsStatusSubscriber.unsubscribe();
		this.statusSubscriber.unsubscribe();
	}
}
