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
    return result
  }

  public async searchUser(type: number, value: number): Promise<User> {
    const url = `users/1?type=${type}&value=${value}`;
    const result = await this.request<null, User>(url, 'post');
    return result;
  }
}
