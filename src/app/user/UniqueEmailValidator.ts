import { Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map, catchError, of } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({ providedIn: 'root' })
export class UniqueEmailValidator implements AsyncValidator {
  constructor(private auth: AuthenticationService) {
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const check = this.auth.existsByEmail(control.value).pipe(
      map((isTaken) => (isTaken && this.auth.getSessionUserEmail() != control.value ? { uniqueEmail: true } : null)),
      catchError(() => of(null))
    );
    return check;
  }
}
