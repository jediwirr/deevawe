import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { Api } from './api.service';
import { UpdateUser, User } from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService extends Api {
  public getUser(userId: number): Observable<User> {
    const url = `user?user_id=${userId}`;
    return this.sendRequest<null, User>(url, 'get', null).pipe(
      map((value) => value)
    );
  }

  public searchUser(type: number, value: number): Observable<User> {
    const url = `users/1?type=${type}&value=${value}`;
    return this.sendRequest<null, User>(url, 'post').pipe(map((user) => user));
  }

  public updateUser(updateUserField: UpdateUser): Observable<User> {
    return this.sendRequest<UpdateUser, User>(
      'user',
      'put',
      updateUserField
    ).pipe((user) => user);
  }
}
