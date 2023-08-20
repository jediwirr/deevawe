import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header';
import { ToastComponent } from './components/toast/toast';
import { DatePickerComponent } from './components/date-picker/date-picker';
import { SelectComponent } from './components/select/select';
import { MapComponent } from './components/map/map';
import { CalendarComponent } from './components/calendar/calendar';
import { ClockComponent } from './components/clock/clock';
import { PipeModule } from '../core/pipes/pipes.module';
import { DirectiveModule } from '../core/directives/directive.module';
import { CardEventComponent } from './components/card-events/card-event';
import { VerifyCodeComponent } from './components/verify/verify-code';
import { ProfileCardComponent } from './components/profile-card/profile-card';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		PipeModule,
		DirectiveModule,
		ScrollingModule,
		ReactiveFormsModule,
	],
	declarations: [
		ToastComponent,
		HeaderComponent,
		DatePickerComponent,
		SelectComponent,
		MapComponent,
		CalendarComponent,
		ClockComponent,
		CardEventComponent,
		VerifyCodeComponent,
		ProfileCardComponent
	],
	exports: [
		ToastComponent,
		HeaderComponent,
		DatePickerComponent,
		SelectComponent,
		MapComponent,
		CalendarComponent,
		ClockComponent,
		DirectiveModule,
		CardEventComponent,
		CommonModule,
		VerifyCodeComponent,
		ProfileCardComponent
	],
})
export class SharedModule {}
