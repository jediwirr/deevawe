import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import {
	ChangePasswordResponse,
	SignOutResponse,
	SignUpUserResponse,
	SingInUserResponse,
} from '../interfaces/api';
import { AuthUserData } from '../interfaces/auth-user';
import { Api } from './api.service';

@Injectable({
	providedIn: 'root',
})
export class AuthApiService extends Api {
	public signIn(userData: AuthUserData): Observable<SingInUserResponse> {
		return this.sendPostRequest<AuthUserData, SingInUserResponse>(
			'signin',
			userData
		).pipe(map((user) => user));
	}

	public signUp(userData: AuthUserData): Observable<SignUpUserResponse> {
		return this.sendPutRequest<AuthUserData, SignUpUserResponse>(
			'signup',
			userData
		).pipe(map((user) => user));
	}

	public signOut(userId: number): Observable<SignOutResponse> {
		return this.sendDeleteRequest<{ user_id: number }, SignOutResponse>(
			'signout',
			{ user_id: userId }
		).pipe(map((response) => response));
	}

	public changePassword(
		userData: AuthUserData
	): Observable<ChangePasswordResponse> {
		return this.sendPostRequest<AuthUserData, ChangePasswordResponse>(
			'change_password',
			userData
		).pipe((response) => response);
	}
}
