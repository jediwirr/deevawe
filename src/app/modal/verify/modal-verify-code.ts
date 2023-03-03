import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { VerifyApiService } from '../../core/services/verify.service';
import { VerifyUserResponse } from '../../core/interfaces/api';
import { ModalComponent } from '../modal-base';
import { map } from 'rxjs';

const enterAnimation = transition(':enter', [
  style({
    right: '-250px',
  }),
  animate('1s ease-in', style({ right: 0 })),
]);

const enterTransition = trigger('animationToast', [enterAnimation]);

@Component({
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.style.scss'],
  animations: [enterTransition],
})
export class ModalVerifyCodeComponent extends ModalComponent implements OnInit {
  @Input() inputData: {
    email: string;
  } = { email: '' };

  public field = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  public showToast = false;

  constructor(private verifyService: VerifyApiService) {
    super();
  }

  ngOnInit(): void {
    this.sendCodeToEmail();
  }

  private setHideToast(): void {
    this.showToast = false;
  }

  private setShowToast(): void {
    this.showToast = true;
  }

  private async sendCodeToEmail(): Promise<void> {
    await this.verifyService.sendCode(this.inputData.email);
    // console.log('asdwws');
    // this.setShowToast();
    //  if (this.toast.length) {
    //    return;
    //  }

    //  this.modalService.injectComponent(this.toast, ToastComponent, {text: `Код отправлен на почту ${this.inputData.email}`});
    //  setTimeout(() => {
    //    this.setHideToast();
    //  }, 50000);
  }

  public submitField(): void {
    if (this.field.valid) {
      if (this.inputData.email) {
        this.verifyService
          .sendUser({
            code: this.field.value,
            email: this.inputData.email,
            type: 'activation',
          })
          .pipe(
            map((result) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              this.isValidResponse(result) && this.closeModal.emit(true);
            })
          );
      }
    }
  }

  private isValidResponse(data: VerifyUserResponse): boolean {
    if (data.code) {
      return false;
    }

    return true;
  }
}
