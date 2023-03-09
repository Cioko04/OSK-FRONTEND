import { Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map, catchError, of } from 'rxjs';
import { UserService } from './user.service';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({ providedIn: 'root' })
export class UniqueEmailValidator implements AsyncValidator {
  constructor(private userService: UserService, private auth: AuthenticationService) {
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const check = this.userService.existsByEmail(control.value).pipe(
      map((isTaken) => (isTaken && this.auth.getUserEmail() != control.value ? { uniqueEmail: true } : null)),
      catchError(() => of(null))
    );
    return check;
  }
}
