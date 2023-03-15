import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { Api } from './api.service';
import { UpdateUser, User } from '../interfaces/users';
import { ErrorApiResponse } from '../interfaces/api';

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

  /**
   *@description будет переработка запроса на бэке
   * @param type 1 обозначает поиск по имени 2 по id
   * @param value значение для поиска
   * @param userId id пользователя который осуществляет поиск
   */
  public searchUser(
    type: 1 | 2,
    value: string,
    userId: string | number
  ): Observable<User & Partial<ErrorApiResponse>> {
    const url = `users?type=${type}&value=${value}&user_id=${userId}`;
    return this.sendRequest<null, User & Partial<ErrorApiResponse>>(
      url,
      'get'
    ).pipe(map((user) => user));
  }

  public updateUser(updateUserField: UpdateUser): Observable<User> {
    return this.sendRequest<UpdateUser, User>(
      'user',
      'put',
      updateUserField
    ).pipe((user) => user);
  }
}
