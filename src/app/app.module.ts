import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ENV } from "../environments/environment";
import { HttpInterceptorService } from './core/services/interceprot.service';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DirectiveModule } from './core/directives/directive.module';
import { WebsocketModule } from './core/services/websocket/websocket.module';
import { ModalModule } from './shared/modal/modal.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		WebsocketModule.config({
			url: ENV.ws
		}),
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule,
		CommonModule,
		ScrollingModule,
		// directives
		DirectiveModule,
		// shared
		SharedModule,
		ModalModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpInterceptorService,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
