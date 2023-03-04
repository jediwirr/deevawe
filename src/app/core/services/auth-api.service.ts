import { Observable, map } from 'rxjs';
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
  public signIn(userData: AuthUserData): Observable<SingInUserResponse> {
    return this.sendRequest<AuthUserData, SingInUserResponse>(
      'signin',
      'post',
      userData
    ).pipe(map((user) => user));
  }

  public signUp(userData: AuthUserData): Observable<SignUpUserResponse> {
    return this.sendRequest<AuthUserData, SignUpUserResponse>(
      'signup',
      'put',
      userData
    ).pipe(map((user) => user));
  }

  public signOut(userId: number): Observable<SignOutResponse> {
    return this.sendRequest<{ user_id: number }, SignOutResponse>(
      'signout',
      'delete',
      { user_id: userId }
    ).pipe(map((response) => response));
  }

  public changePassword(
    userData: UserDataVerify
  ): Observable<ChangePasswordResponse> {
    return this.sendRequest<UserDataVerify, ChangePasswordResponse>(
      'change_password',
      'post',
      userData
    ).pipe((response) => response);
  }
}
