import { Injectable } from '@angular/core';
import {
  ChangePasswordResponse,
  SignOutResponse,
  SignUpUserResponse,
  SingInUserResponse,
} from '../interfaces/api';
import { AuthUserData, UserDataVerify } from '../interfaces/auth-user';
import { Api } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService extends Api {
  public async signIn(userData: AuthUserData): Promise<SingInUserResponse> {
    const result = await this.sendRequest<AuthUserData, SingInUserResponse>(
      'signin',
      'post',
      userData
    );
    return result;
  }

  public async signUp(userData: AuthUserData): Promise<SignUpUserResponse> {
    const result = await this.sendRequest<AuthUserData, SignUpUserResponse>(
      'signup',
      'put',
      userData
    );
    return result;
  }

  public async signOut(userId: number): Promise<SignOutResponse> {
    const result = await this.sendRequest<{ user_id: number }, SignOutResponse>(
      'signout',
      'delete',
      { user_id: userId }
    );
    return result;
  }

  public async changePassword(
    userData: UserDataVerify
  ): Promise<ChangePasswordResponse> {
    const result = await this.sendRequest<UserDataVerify, ChangePasswordResponse>(
      'change_password',
      'post',
      userData
    );
    return result;
  }
}
