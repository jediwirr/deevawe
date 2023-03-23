import { Observable, catchError, of, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV } from '@app/env';
import type { UserData } from '../interfaces/localStorage.d';
import { LocalStorageService } from './localStorage.service';

@Injectable()
export class Api {
	constructor(
		private http: HttpClient,
		private localStorageService: LocalStorageService
	) {}

	private async getOptions<B>(body?: B) {
		const options: Partial<Record<string, unknown>> = {};
		options['headers'] = await this.getHttpHeader();

		if (body) {
			options['body'] = JSON.stringify(body);
		}
		return options;
	}

	private async getHttpHeader(): Promise<HttpHeaders> {
		let headers = new HttpHeaders({
			Client: ENV.client,
			Accept: '*/*',
		});

		const token = await this.getToken();

		if (token) {
			headers = headers.set('Authorization', `${token?.authToken}`);
		}

		return headers;
	}

	private async getToken(): Promise<UserData | null> {
		try {
			return await this.localStorageService.getItemLocalStorage<UserData>(
				'dataUser'
			);
		} catch (error) {
			return null;
		}
	}

	public sendRequest<T, R>(
		url: string,
		method: string,
		body: T | null = null
	): Observable<R> {
		return new Observable((subscriber) => {
			from(this.getOptions(body)).subscribe((options) => {
				this.http
					.request<R>(method, ENV.baseUrl + url, options)
					.pipe(catchError((err) => of(err.error)))
					.subscribe((result) => {
						// @ts-ignore
						subscriber.next(result);
						subscriber.complete();
					});
			});
		});
	}
}
