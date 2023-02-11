import { Router } from '@angular/router';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { AuthApiService } from '../core/services/auth-api.service';
import { AuthUserData } from '../core/interfaces/auth-user';
import { UserData } from '../core/interfaces/localStorage';
import { ModalService } from '../core/services/modal.service';
import { ModalVerifyCodeComponent } from '../modal/verify/modal-verify-code';
import { LocalStorageService } from '../core/services/localStorage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.style.scss'],
})
export class AuthPageComponent {
  @ViewChild('modal', { read: ViewContainerRef }) modal!: ViewContainerRef;

  public isSignUp = false;

  constructor(
    private authApiService: AuthApiService,
    private modalService: ModalService,
    private localStorageService: LocalStorageService,
    protected router: Router
  ) {}

  public async requestSignIn(userData: AuthUserData): Promise<void> {
    const result = await this.authApiService.signIn(userData);
    if (result.code) {
      return;
    }
    this.localStorageService.setToken(result.token);
    this.localStorageService.setDataToStorage<UserData>('dataUser', {
      id: result.user,
      authToken: result.token,
    });
    this.router.navigateByUrl('profile');
  }

  public async requestSignUp(userData: AuthUserData): Promise<void> {
    const result = await this.authApiService.signUp(userData);
    if (result.code) {
      return;
    }
    this.modalService.injectComponent<ModalVerifyCodeComponent>(
      this.modal,
      ModalVerifyCodeComponent,
      {
        email: userData.email,
      }
    );
    this.modalService.closedModal.subscribe((res) => {
      if (res) {
        this.modalService.destroyModal();
      }
    });
  }

  // public async requestChangePassword() {}

  public setFlagSignUp(): void {
    this.isSignUp = !this.isSignUp;
  }
}
