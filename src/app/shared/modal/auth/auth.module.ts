import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { AuthModalComponent } from './auth';
import { SignInComponent } from './signIn/signIn.component';
import { SignUpComponent } from './signUp/signUp.component';
import { ChangePasswordComponent } from './changePassword/changePassword.component';

@NgModule({
	imports: [ReactiveFormsModule, CommonModule, SharedModule],
	providers: [],
	declarations: [
		SignInComponent,
		AuthModalComponent,
		SignUpComponent,
		ChangePasswordComponent,
	],
	exports: [AuthModalComponent],
})
export class AuthModule {}
