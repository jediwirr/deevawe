import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthUserData } from 'src/app/core/interfaces/auth-user';
import { ValidatorsService } from '../../core/services/validators.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './signUp.component.html',
  styleUrls: ['../auth.style.scss'],
})
export class SignUpComponent implements OnInit {
  @Output() submitSignUp = new EventEmitter<AuthUserData>();

  @Output() redirectEvent = new EventEmitter();

  public signUpForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.signUpForm = this.fb.group(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        repeatPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
      },
      { checkPassword: ValidatorsService.checkPassword }
    );
  }

  public submitForm(): void {
    if (!this.signUpForm.valid) {
      const { email, password } = this.signUpForm.value;
      this.submitSignUp.emit({ email, password });
    }
  }

  public redirectToSignIn(): void {
    this.redirectEvent.emit();
  }
}
