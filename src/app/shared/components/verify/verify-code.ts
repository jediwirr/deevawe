import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { VerifyApiService } from '../../../core/services/verify.service';
import { VerifyUserResponse } from '../../../core/interfaces/api';

const enterAnimation = transition(':enter', [
  style({
    right: '-250px',
  }),
  animate('1s ease-in', style({ right: 0 })),
]);

const enterTransition = trigger('animationToast', [enterAnimation]);

@Component({
  selector: 'app-verify',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.style.scss'],
  animations: [enterTransition],
})
export class VerifyCodeComponent implements OnInit {
  @Input() email = '';

  @Output() changePreviousContent = new EventEmitter();

  public field = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  public showToast = false;

  constructor(private verifyService: VerifyApiService) {
  }

  ngOnInit(): void {
    this.sendCodeToEmail();
  }

  public sendCodeToEmail(): void {
     if (!this.email) {
      return;
     }
     this.verifyService.sendCode(this.email).subscribe((result) => {
     console.log(result);
     });
  }

  public submitField(): void {
    if (this.field.valid) {
      if (this.email) {
        this.verifyService
          .sendUser({
            code: this.field.value,
            email: this.email,
            type: 'activation',
          }).subscribe((result) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            this.isValidResponse(result);
          });
      }
    }
  }

  public changeBackBtn(): void {
    this.changePreviousContent.emit();
  }

  private isValidResponse(data: VerifyUserResponse): boolean {
    if (data.code) {
      return false;
    }

    return true;
  }
}
