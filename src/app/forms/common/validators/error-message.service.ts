import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessageService {
  constructor() {}

  getErrorMessage(formControl: FormControl) {
    if (formControl?.hasError('minlength')) {
      const minlength = formControl.getError('minlength').requiredLength;
      return `Minimalna długość to ${minlength}!`;
    }
    if (formControl?.hasError('maxlength')) {
      const maxlength = formControl.getError('maxlength').requiredLength;
      return `Maksymalna długość to ${maxlength}!`;
    }
    if (formControl?.hasError('passwordMatch')) {
      return 'Hasła się nie zgadzają!';
    }
    if (formControl?.hasError('age')) {
      return 'Minimalny wiek 14 lat!';
    }
    if (formControl?.hasError('email')) {
      return 'Błędny email!';
    }
    if (formControl?.hasError('uniqueEmail')) {
      return 'Email jest zajęty!';
    }
    return '';
  }
}
