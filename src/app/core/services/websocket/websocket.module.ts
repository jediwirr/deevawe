import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { WebSocketConfig } from '../../interfaces/websocket/websocket.interfaces';
import { config } from './websocket.config';
import { WebsocketService } from './websocket.service';

@NgModule({
	imports: [
		CommonModule
	],
	providers: [WebsocketService]
})

export class WebsocketModule {
	public static config(wsConfig: WebSocketConfig): ModuleWithProviders<WebsocketModule> {
		return {
			ngModule: WebsocketModule,
			providers: [{ provide: config, useValue: wsConfig }]
		};
	}
}
