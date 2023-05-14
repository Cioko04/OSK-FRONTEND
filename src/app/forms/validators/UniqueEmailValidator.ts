import { Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Observable, map, catchError, of } from 'rxjs';
import { AuthenticationService } from '../../authentication/authentication.service';

@Injectable({ providedIn: 'root' })
export class UniqueEmailValidator implements AsyncValidator {
  constructor(private auth: AuthenticationService) {
  }
  validate(control: AbstractControl): Observable<ValidationErrors | null> | Promise<ValidationErrors | null> {
    throw new Error('Method not implemented.');
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }
  checkEmailValidity(email: string): ValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const check = this.auth.existsByEmail(control.value).pipe(
        map((isTaken) => (isTaken && (email != control.value) ? { uniqueEmail: true } : null)),
        catchError(() => of(null))
      );
      return check;
  }
  }
}
