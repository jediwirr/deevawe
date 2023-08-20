import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { Api } from './api.service';
import { UpdateUser, User } from '../interfaces/users';
import { ErrorApiResponse, SuccessReturn } from '../interfaces/api';

@Injectable({
	providedIn: 'root',
})
export class UsersApiService extends Api {
	public getUserByName(
		userId: number,
		userName: string
	): Observable<User & ErrorApiResponse> {
		const url = `user?user_id=${userId}&field=name&val=${userName}`;
		return this.sendGetRequest<null, User>(url).pipe(map((value) => value));
	}

	public getUserById(
		userId: number,
		originUserId?: number
	): Observable<User> {
		const url = `user?user_id=${userId}&field=id&val=${
			originUserId || userId
		}`;
		return this.sendGetRequest<null, User>(url).pipe(map((value) => value));
	}

	public updateUser(updateUserField: UpdateUser): Observable<User> {
		return this.sendPutRequest<UpdateUser, User>(
			'user',
			updateUserField
		).pipe((user) => user);
	}

	public suggestAFriend(
		userId: number,
		recipientId: number
	): Observable<SuccessReturn & ErrorApiResponse> {
		return this.sendPutRequest<
			{ user_id: number; recipient: number },
			SuccessReturn
		>('connection/suggest', {
			user_id: userId,
			recipient: recipientId,
		}).pipe((suggest) => suggest);
	}
}
