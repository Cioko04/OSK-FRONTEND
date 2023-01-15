import { Directive, Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appPasswordIdentity]',
})
@Injectable({ providedIn: 'root' })
export class PasswordIdentityDirective {
  public passwordIdentity: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password');
    const secondPassword = control.get('secondPassword');
    const passwordMatch =
      password && secondPassword && password.value === secondPassword.value;
    if (!password?.errors?.['required'] && !password?.errors?.['minlength']) {
      if (passwordMatch) {
        password?.setErrors(null);
        secondPassword?.setErrors(null);
      } else {
        password?.setErrors({ password: true });
        secondPassword?.setErrors({ secondPassword: true });
      }
    }

    return passwordMatch ? null : { passwordIdentity: true };
  };
}


