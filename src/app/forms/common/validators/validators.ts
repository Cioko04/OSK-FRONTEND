import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';


export const matchPassword: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  const passwordMatch =
    password && confirmPassword && password.value === confirmPassword.value;
  if (!password?.errors?.['required'] && !password?.errors?.['minlength']) {
    if (passwordMatch) {
      password?.setErrors(null);
      confirmPassword?.setErrors(null);
    } else {
      password?.setErrors({ passwordMatch: true });
      confirmPassword?.setErrors({ passwordMatch: true });
    }
  }
  return passwordMatch ? null : { passwordMatch: true };
};

export const adultly: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const today = new Date();
  const birthDate = new Date(control.value);
  let age = today.getFullYear() - birthDate.getFullYear();
  const months = today.getMonth() - birthDate.getMonth();
  if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age < 14 || age > 100 ? { age: true } : null;
};
