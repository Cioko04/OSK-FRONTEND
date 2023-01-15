import { UserService } from './../user/service/user.service';
import { Injectable } from "@angular/core";
import { AsyncValidator, AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, map, catchError, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UniqueEmailValidator implements AsyncValidator {
  constructor(private userService: UserService) {}

  validate(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    const check = this.userService.existsByEmail(control.value).pipe(
      map(isTaken => (isTaken ? { uniqueEmail: true } : null)),
      catchError(() => of(null))
    );
    console.log(check);
    return check;
  }
}
