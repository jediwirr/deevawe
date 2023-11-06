import { Injectable, OnDestroy } from "@angular/core";
import { distinctUntilChanged, interval, Observable, Observer, share, Subject, SubscriptionLike, takeWhile} from "rxjs";
import { WebSocketSubject, WebSocketSubjectConfig, webSocket } from "rxjs/webSocket";
import { IWebsocketService } from "../../interfaces/websocket/websocket.interfaces";

@Injectable({
	providedIn: 'root'
})

export class WebsocketService implements IWebsocketService, OnDestroy {
	private wsMessages$!: Subject<any>;

	private webSocket$!: WebSocketSubject<any>;

	private config!: WebSocketSubjectConfig<any>;

	private connection!: Observer<boolean>;

	private reconnection!: Observable<number> | null;

	private statusSubscriber!: SubscriptionLike;

	private wsStatusSubscriber!: SubscriptionLike;

	private isConnected = false;

	private reconnectInterval = 5000;

	private reconnectAttempts = 5;

	public status!: Observable<boolean>;


	public connect(url: string): void {
		this.wsMessages$ = new Subject<any>();
		this.config = {
			url,
			closeObserver: {
				next: (event: CloseEvent) => {
					console.log('WS Disconnected');
					this.webSocket$.next(null);
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
		this.webSocket$ = webSocket(this.config);


		this.webSocket$.subscribe({
			next: (message) => {
				// this.wsMessages$ = new Subject<IWsMessage<Record<string, string>>>();
				this.wsMessages$.next(message);
			},
			error: () => {
				if (!this.webSocket$) {
					// for reconnect
					throw new Error('failed connect websocket');
				}
			}
		  });

		this.setConnectionStatus();
		this.setReconnectStatus();
	}

	public on(): Observable<any> {
		return this.wsMessages$;
	}

	public send(body: unknown): void {
		this.webSocket$.next(body);

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
			.pipe(takeWhile((v, index) => index < this.reconnectAttempts && !this.webSocket$));


		this.reconnection.subscribe(
			{
				next: () => this.connect(this.config.url),
				error: () => null,
				complete: () => {
					// Subject complete if reconnect attemts ending
					this.reconnection = null;
					if (!this.webSocket$) {
						this.wsMessages$.complete();
						this.connection.complete();
					}
				}
			});
	}


	public ngOnDestroy(): void {
		this.wsStatusSubscriber.unsubscribe();
		this.statusSubscriber.unsubscribe();
	}
}
