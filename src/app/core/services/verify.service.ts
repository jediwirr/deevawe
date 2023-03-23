import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SendVerifyCodeResponse, VerifyUserResponse } from '../interfaces/api';
import { UserDataVerify } from '../interfaces/auth-user';
import { Api } from './api.service';

@Injectable({
	providedIn: 'root',
})
export class VerifyApiService extends Api {
	public sendCode(email: string): Observable<SendVerifyCodeResponse> {
		return this.sendRequest<{ email: string }, SendVerifyCodeResponse>(
			'send_verify_code',
			'post',
			{ email }
		).pipe((code) => code);
	}

	public sendUser(userData: UserDataVerify): Observable<VerifyUserResponse> {
		return this.sendRequest<UserDataVerify, VerifyUserResponse>(
			'verify_user',
			'post',
			userData
		).pipe(map((value) => value));
	}
}
