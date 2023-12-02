import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveModule } from '../../core/directives/directive.module';
import { SharedModule } from '../shared.module';
import { AuthModule } from './auth/auth.module';
import { EventFormComponent } from './event/event';

@NgModule({
	imports: [
		ReactiveFormsModule,
		DirectiveModule,
		CommonModule,
		SharedModule,
		FormsModule,
		AuthModule,
	],
	declarations: [EventFormComponent],
	exports: []
})
export class ModalModule {}
