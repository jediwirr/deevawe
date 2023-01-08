import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import type { AuthUserData } from '../../core/interfaces/auth-user';
import { ChangePasswordComponent } from '../../modal/changePassword/changePassword';
import { ModalService } from '../../core/services/modal.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './signIn.component.html',
  styleUrls: ['../auth.style.scss'],
})
export class SignInComponent {
  @ViewChild('modal', { read: ViewContainerRef }) modal!: ViewContainerRef;

  @Output() submitSignIn = new EventEmitter<AuthUserData>();

  @Output() redirectEvent = new EventEmitter();

  constructor(private modalService: ModalService) {}

  public sigInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  public submitForm(): void {
    if (this.sigInForm.valid) {
      this.submitSignIn.emit(this.sigInForm.value);
    }
  }

  public redirectToSignUp(): void {
    this.redirectEvent.emit();
  }

  public changePassword(): void {
    this.modalService.injectComponent<ChangePasswordComponent>(
      this.modal,
      ChangePasswordComponent
    );
  }
}
