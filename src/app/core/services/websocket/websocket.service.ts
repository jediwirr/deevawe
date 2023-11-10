import { Injectable, OnDestroy } from "@angular/core";
import { distinctUntilChanged, interval, Observable, Observer, share, Subject, SubscriptionLike, takeWhile } from "rxjs";
import { WebSocketSubject, WebSocketSubjectConfig, webSocket } from "rxjs/webSocket";
import { IWebsocketService } from "../../interfaces/websocket/websocket.interfaces";
import { map } from "rxjs";

@Injectable({
	providedIn: 'root'
})


export class WebsocketService implements IWebsocketService, OnDestroy {
	private wsMessages$!: Subject<MessageEvent>;

	private webSocket$!: WebSocketSubject<any>;

	private config!: WebSocketSubjectConfig<any>;

	private connection!: Observer<boolean>;

	private reconnection!: Observable<number> | null;

	private statusSubscriber!: SubscriptionLike;

	private wsStatusSubscriber!: SubscriptionLike;

	public isConnected = new Subject<boolean>;

	private reconnectInterval = 5000;

	private reconnectAttempts = 5;

	public status!: Observable<boolean>;




	public connect(url: string): any {
		this.wsMessages$ = new Subject<any>();
		this.setConnectionStatus().subscribe({
			next: () => {
				this.config = {
					url,
					closeObserver: {
						next: (event: CloseEvent) => {
							console.log('WS Disconnected');
							this.webSocket$.next(null);
							this.connection.next(false);
							this.isConnected.next(false)
						}
					},
					openObserver: {
						next: (event: Event) => {
							console.log('WS Connected');
							this.connection.next(true);
							this.isConnected.next(true)
						}
					},
					deserializer: (event: Event) => {
						return event;
					}
				};
				this.webSocket$ = webSocket(this.config);
				this.webSocket$.subscribe({
					next: (message) => {
						this.wsMessages$.next(message);
					},
					error: () => {
						if (!this.webSocket$) {
							throw new Error('failed connect websocket');
						}
					}
				});
				this.setReconnectStatus();
			}
		})
	}




	public on(): Observable<any> {
		return this.wsMessages$.pipe(map((mes: any) => mes.data))
	}




	public send(body: unknown): void {
		this.webSocket$.next(body);
	}




	private setConnectionStatus(): Observable<any> {
		return new Observable((subscriber) => {
			this.status = new Observable<boolean>((subscriber) => {
				this.connection = subscriber;
			}).pipe(share(), distinctUntilChanged());
			subscriber.next();
			subscriber.complete();
		})
	}



	private setReconnectStatus(): void {
		this.statusSubscriber = this.status.subscribe((observer) => {

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
