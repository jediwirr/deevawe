import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthPageComponent } from './auth';
import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './signIn/signIn.component';
import { SignUpComponent } from './signUp/signUp.component';

@NgModule({
  imports: [AuthRoutingModule, ReactiveFormsModule, CommonModule],
  providers: [],
  declarations: [SignInComponent, AuthPageComponent, SignUpComponent],
  exports: [AuthPageComponent],
})
export class AuthModule {}
