import { Router } from '@angular/router';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../../../../core/services/localStorage.service';
import { AuthApiService } from '../../../../core/services/auth-api.service';
import type { AuthUserData } from '../../../../core/interfaces/auth-user';
import { UserData } from '../../../../core/interfaces/localStorage';

@Component({
	selector: 'app-sign-in',
	templateUrl: './signIn.component.html',
	styleUrls: ['../auth-modal.style.scss'],
})
export class SignInComponent {
	@Output() submitSignIn = new EventEmitter<AuthUserData>();

	@Output() redirectEventToSignUp = new EventEmitter();

	@Output() redirectEventToChangePassword = new EventEmitter();

	public sigInForm = new FormGroup({
		email: new FormControl<string>('', {
			nonNullable: true,
			validators: [Validators.required],
		}),
		password: new FormControl<string>('', {
			nonNullable: true,
			validators: [Validators.required, Validators.minLength(8)],
		}),
	});

	constructor(
		private authApiService: AuthApiService,
		protected localStorageService: LocalStorageService,
		protected router: Router
	) {}

	public submitForm(): void {
		if (!this.sigInForm.valid) {
			console.log('not valid');
			return;
		}
		const { email, password } = this.sigInForm.controls;
		this.requestSignIn({
			email: email.value,
			password: password.value,
		});
	}

	public requestSignIn(userData: AuthUserData): void {
		this.authApiService.signIn(userData).subscribe((result) => {
			if (result.code) {
				return;
			}
			this.localStorageService.setToken(result.token);
			this.localStorageService.setDataToStorage<UserData>('dataUser', {
				id: result.user,
				authToken: result.token,
			});
			this.router.navigateByUrl('profile');
		});
	}

	public redirectToSignUp(): void {
		this.redirectEventToSignUp.emit();
	}

	public redirectToChangePassword(): void {
		this.redirectEventToChangePassword.emit();
	}
}
