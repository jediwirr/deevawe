import { Injectable } from '@angular/core';
import { Api } from './api.service';
import { User } from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService extends Api {
  public async getUser(userId: string): Promise<User> {
    const result = await this.request<null, User>(
      `user/${userId}`,
      'get',
      null
    );
    return result;
  }

}
