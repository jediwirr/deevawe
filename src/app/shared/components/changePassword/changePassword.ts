import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthApiService } from 'src/app/core/services/auth-api.service';

@Component({
	selector: 'app-reset-password',
	templateUrl: './changePassword.component.html',
	styleUrls: ['./changePassword.style.scss'],
})
export class ChangePasswordComponent {
	public isShowVerifyComponent = false;

	@Output() changePreviousContent = new EventEmitter();

	constructor(private authApiService: AuthApiService) {}

	public changePasswordForm = new FormGroup({
		email: new FormControl<string>('', {
			nonNullable: true,
			validators: [Validators.required, Validators.email],
		}),
		password: new FormControl<string>('', {
			nonNullable: true,
			validators: [Validators.required, Validators.minLength(8)],
		}),
		newPassword: new FormControl('', {
			nonNullable: true,
			validators: [Validators.required, Validators.minLength(8)],
		}),
	});

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
					this.setIsShowVerifyComponent();
					console.log(result);
				}
			});
	}

	public setIsShowVerifyComponent(): void {
		this.isShowVerifyComponent = !this.isShowVerifyComponent;
	}

	public changeBackBtn(): void {
		this.changePreviousContent.emit();
	}
}
