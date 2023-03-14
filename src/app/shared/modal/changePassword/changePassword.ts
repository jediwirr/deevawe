import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from '../modal-base';
import { ModalService } from '../../../core/services/modal.service';
import { ModalVerifyCodeComponent } from '../verify/modal-verify-code';

@Component({
  templateUrl: './changePassword.component.html',
  styleUrls: ['./changePassword.style.scss'],
})
export class ChangePasswordComponent extends ModalComponent {
  @ViewChild('modal', { read: ViewContainerRef }) modal!: ViewContainerRef;

  constructor(private modalService: ModalService) {
    super();
  }

  public changePasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  public async submitForm(): Promise<void> {
    //     if (!this.changePasswordForm.valid) {
    //         return;
    //     }
    //    const result = await this.api.changePassword({code: '5055', email: this.changePasswordForm.get('email')?.value, type: 'activation'});
    //    if (result.success) {
    this.modalService.injectComponent<ModalVerifyCodeComponent>(
      this.modal,
      ModalVerifyCodeComponent,
      {
        email: this.changePasswordForm.get('email')?.value,
      }
    );
    this.modalService.closedModal.subscribe(() => {
      this.closeModal.emit();
    });
    //    }
  }

  public destroyModal(): void {
    console.log('asdwws');

    // this.modalService.destroyModal();
  }
}
