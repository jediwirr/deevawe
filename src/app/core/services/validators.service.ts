import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  public static get checkPassword(): ValidatorFn {
    return (controls: AbstractControl): ValidationErrors | null => {
      console.log(controls.get('repeatPassword')?.value);
      console.log(controls.get('password')?.value);

      if (!controls.get('password')?.dirty || controls.get('Password')?.dirty) {
        return null;
      }

      if (
        controls.get('repeatPassword')?.value !==
        controls.get('password')?.value
      ) {
        return { custom: 'Пароли не совпадают!' };
      }

      return null;
    };
  }
}
