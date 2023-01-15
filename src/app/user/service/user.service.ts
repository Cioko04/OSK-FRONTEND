import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserHttpService } from '../http/user-http.service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpUserService: UserHttpService) { }

  existsByEmail(email: string): Observable<boolean>{
    return this.httpUserService.existsByEmail(email);
  }

  addUser(user: User) {
    const u: User = user;
    this.httpUserService.addUser(u);
  }


}
