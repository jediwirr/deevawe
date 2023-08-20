import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Api } from '../api.service';
import { SuccessReturn } from '../../interfaces/api';
import { ErrorApiCode } from '../../interfaces/errors-code-api';
import { LocalStorageService } from '../localStorage.service';

@Injectable({
	providedIn: 'root',
})
export class ImageService extends Api {
	constructor(public httpClient: HttpClient) {
		super(httpClient, new LocalStorageService());

		super.setBaseUrl('/image/');
	}

	public setImage(
		userId: number,
		image: string
	): Observable<SuccessReturn & ErrorApiCode> {
		return this.sendPutRequest<
			{ user_id: number; image: string },
			SuccessReturn & ErrorApiCode
		>('save_image', {
			user_id: userId,
			image,
		}).pipe(map((result) => result));
	}

	public getImage(imageId: string): Observable<any> {
		const url = `get_image?image=${imageId}`;
		return this.sendGetRequest(url).pipe(map((result) => result));
	}
}
