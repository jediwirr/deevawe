import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header';
import { ToastComponent } from './toast/toast';
import { DatePickerComponent } from './date-picker/date-picker';
import { SelectComponent } from './select/select';
import { MapComponent } from './map/map';
import { CalendarComponent } from './calendar/calendar';
import { ClockComponent } from './clock/clock';
import { PipeModule } from '../core/pipes/pipes.module';
import { DirectiveModule } from '../core/directives/directive.module';
import { CardEventComponent } from './card-events/card-event';

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
  ],
  exports: [
    ToastComponent,
    HeaderComponent,
    DatePickerComponent,
    SelectComponent,
    MapComponent,
    CalendarComponent,
    ClockComponent,
    CardEventComponent,
    CommonModule,
  ],
})
export class SharedModule {}
