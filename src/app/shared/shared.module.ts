import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation/navigation';
import { ToastComponent } from './toast/toast';
import { DatePickerComponent } from './date-picker/date-picker';
import { SelectComponent } from './select/select';
import { MapComponent } from './map/map';
import { CalendarComponent } from './calendar/calendar';
import { ClockComponent } from './clock/clock';
import { CardEventComponent } from './card-events/card-event';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    ToastComponent,
    NavigationComponent,
    DatePickerComponent,
    SelectComponent,
    MapComponent,
    CalendarComponent,
    ClockComponent,
    CardEventComponent,
  ],
  exports: [
    ToastComponent,
    NavigationComponent,
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
