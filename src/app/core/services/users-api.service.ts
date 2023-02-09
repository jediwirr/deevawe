import { Injectable } from '@angular/core';
import { Api } from './api.service';
import { UpdateUser, User } from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService extends Api {
  public async getUser(userId: number): Promise<User> {
    const url = `user?user_id=${userId}`;
    const result = await this.sendRequest<null, User>(url, 'get', null);
    return result;
  }

  public async searchUser(type: number, value: number): Promise<User> {
    const url = `users/1?type=${type}&value=${value}`;
    const result = await this.sendRequest<null, User>(url, 'post');
    return result;
  }

  public async updateUser(updateUserField: UpdateUser): Promise<User> {
    const result = await this.sendRequest<UpdateUser, User>(
      'user',
      'put',
      updateUserField
    );
    return result;
  }
}
