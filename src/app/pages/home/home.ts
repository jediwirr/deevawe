import { ENV } from '@app/env';
import { OnDestroy , Component } from '@angular/core';
import { Subject } from 'rxjs';
import { TokenService } from "../../core/services/token.service";
import { WebsocketService } from "../../core/services/websocket/websocket.service";

const { ws } = ENV;
@Component({
	templateUrl: './home.component.html',
})
export class HomePageComponent implements OnDestroy {
	private destroy$ = new Subject<void>();

	constructor(private wsService: WebsocketService, private tokenService: TokenService) {
		tokenService.receive().subscribe({
			next: ((token) => {
				const url = `${ws}?token=${token}`;
				wsService.connect(url);
			})
		});
		// Ниже примеры отправки

		// Если появиласб очередь использовать pipe first() или аналоги для автоматической отписки

		// Описать типы для body
		// так отправлять запрос на вебсокет
		// setTimeout(() => {
		// 	wsService.send({
		// 		method: "new",
		// 		body: {
		// 			min: 600,
		// 			time_start: 1694244600,
		// 			lat:59.80228462,
		// 			lon:30.37665965,
		// 			radius:1000
		// 		}
		// 	});
		// }, 1000);


		// Получение результата сообщения
		// setTimeout(() => {
		// 	wsService.on().subscribe({
		// 		next:((result) => {
		// 			console.log(result);

		// 		})
		// 	});
		// }, 1000);
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
