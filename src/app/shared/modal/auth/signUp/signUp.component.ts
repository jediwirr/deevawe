import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUserData } from 'src/app/core/interfaces/auth-user';
import { AuthApiService } from '../../../../core/services/auth-api.service';
// import { ValidatorsService } from '../../../core/services/validators.service';

@Component({
	selector: 'app-sign-up',
	templateUrl: './signUp.component.html',
	styleUrls: ['../auth-modal.style.scss'],
})
export class SignUpComponent {
	@Output() redirectEventToSignIn = new EventEmitter();

	public isShowVerifyContent = false;

	public signUpForm = new FormGroup(
		{
			email: new FormControl<string>('', {
				nonNullable: true,
				validators: [Validators.required, Validators.email],
			}),
			password: new FormControl<string>('', {
				nonNullable: true,
				validators: [Validators.required, Validators.minLength(8)],
			}),
			repeatPassword: new FormControl<string>('', {
				nonNullable: true,
				validators: [Validators.required, Validators.minLength(8)],
			}),
		}
		// { checkPassword: ValidatorsService.checkPassword }
	);

	constructor(private authApiService: AuthApiService) {}

	public submitForm(): void {
		if (!this.signUpForm.valid) {
			const { email, password } = this.signUpForm.controls;
			this.requestSignUp({
				email: email.value,
				password: password.value,
			});
		}
	}

	private requestSignUp(userData: AuthUserData): void {
		this.authApiService.signUp(userData).subscribe((result) => {
			if (result.code) {
				return;
			}
			this.setIsShowContent();
		});
	}

	public setIsShowContent(): void {
		this.isShowVerifyContent = !this.isShowVerifyContent;
	}

	public redirectToSignIn(): void {
		this.redirectEventToSignIn.emit();
	}
}
