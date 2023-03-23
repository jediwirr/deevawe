import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveModule } from '../../core/directives/directive.module';
import { SharedModule } from '../shared.module';
import { ChangePasswordComponent } from './changePassword/changePassword';
import { EventFormComponent } from './event/event';
import { ModalVerifyCodeComponent } from './verify/modal-verify-code';

@NgModule({
  imports: [
    ReactiveFormsModule,
    DirectiveModule,
    CommonModule,
    SharedModule,
    FormsModule,
  ],
  declarations: [
    ChangePasswordComponent,
    ModalVerifyCodeComponent,
    EventFormComponent,
  ],
  exports: [ChangePasswordComponent, ModalVerifyCodeComponent],
})
export class ModalModule {}