import { ENV } from '@app/env';
import { OnDestroy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { TokenService } from "../../core/services/token.service";
import { WebsocketService } from "../../core/services/websocket/websocket.service";

const { ws } = ENV;
@Component({
	templateUrl: './home.component.html',
})
export class HomePageComponent implements OnDestroy {
	private destroy$ = new Subject<void>();
	public events!: any;

	constructor(private wsService: WebsocketService, private tokenService: TokenService) {

		tokenService.receive().subscribe({
			next: ((token: string) => {
				const url = `${ws}?token=${token}`;
				wsService.connect(url);
			})
		});
	}

	public getEvents(event: any) {
		console.log(event)
		this.events = event.events;
	}




	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
