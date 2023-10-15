import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import {
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
}
