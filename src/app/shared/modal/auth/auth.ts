import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ModalComponent } from '../modal-base';
import { AuthType } from '../../../core/interfaces/auth';

@Component({
	templateUrl: './auth-modal.component.html',
	styleUrls: ['./auth-modal.style.scss'],
})
export class AuthModalComponent extends ModalComponent {
	public authType = AuthType;

	public type: AuthType = AuthType.SIGN_IN;

	constructor(protected router: Router) {
		super();
	}

	// раскомменитровать, если понадобится авторизация
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public setAuthType(type: AuthType): void {
		// this.type = type;
	}

	public destroyModal(): void {
		this.closeModal.emit();
	}
}
