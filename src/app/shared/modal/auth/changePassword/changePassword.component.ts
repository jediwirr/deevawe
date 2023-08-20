import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthApiService } from '../../../../core/services/auth-api.service';
import { LocalStorageService } from '../../../../core/services/localStorage.service';

@Component({
	selector: 'app-change-password',
	templateUrl: './changePassword.component.html',
	styleUrls: ['../auth-modal.style.scss'],
})
export class ChangePasswordComponent {
	@Output() redirectEventToSignIn = new EventEmitter();

	public changePasswordForm = new FormGroup({
		email: new FormControl<string>('', {
			nonNullable: true,
			validators: [Validators.required, Validators.email],
		}),
		oldPassword: new FormControl<string>('', {
			nonNullable: true,
			validators: [Validators.required, Validators.minLength(8)],
		}),
		newPassword: new FormControl<string>('', {
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
		if (!this.changePasswordForm.valid) {
			return;
		}
		const { email, newPassword } = this.changePasswordForm.controls;
		this.authApiService
			.changePassword({
				email: email.value,
				password: newPassword.value,
			})
			.subscribe((result) => {
				if (result.success) {
					// this.setIsShowVerifyComponent();
					console.log(result);
					throw new Error(
						'Redirect to verify component not implemented!'
					);
				}
			});
	}

	public redirectToSignIn(): void {
		this.redirectEventToSignIn.emit();
	}
}
