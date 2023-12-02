import { NgModule } from '@angular/core';
import { EventIcon } from './event-icon.pipe';
import { Timer } from './time';
import { TimeOfDay } from './time-of-day.pipe';

@NgModule({
	declarations: [Timer, EventIcon,TimeOfDay],
	exports: [Timer, EventIcon,TimeOfDay],
})
export class PipeModule {}
