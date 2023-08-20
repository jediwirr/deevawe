import { NgModule } from '@angular/core';
import { EventIcon } from './event-icon.pipe';
import { Timer } from './time';

@NgModule({
	declarations: [Timer, EventIcon],
	exports: [Timer, EventIcon],
})
export class PipeModule {}
