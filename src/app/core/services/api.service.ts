import { Observable, catchError, of, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV } from '@app/env';
import type { UserData } from '../interfaces/localStorage.d';
import { LocalStorageService } from './localStorage.service';

@Injectable()
export class Api {
	private baseUrl: string;

	constructor(
		protected http: HttpClient,
		private localStorageService: LocalStorageService
	) {
		this.baseUrl = ENV.baseUrl;
	}

	protected async getOptions<B>(body?: B): Promise<Record<string, unknown>> {
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

	protected sendGetRequest<T, R>(
		url: string,
		body: T | null = null
	): Observable<R> {
		return this.sendRequest(url, 'get', body);
	}

	protected sendPutRequest<T, R>(
		url: string,
		body: T | null = null
	): Observable<R> {
		return this.sendRequest(url, 'put', body);
	}

	protected sendPostRequest<T, R>(
		url: string,
		body: T | null = null
	): Observable<R> {
		return this.sendRequest(url, 'post', body);
	}

	protected sendDeleteRequest<T, R>(
		url: string,
		body: T | null = null
	): Observable<R> {
		return this.sendRequest(url, 'delete', body);
	}

	protected setBaseUrl(baseUrl: string): void {
		this.baseUrl = baseUrl;
	}

	/**
	 * @deprecated
	 * Будет приватным приватным
	 * @param url
	 * @param method
	 * @param body
	 */
	public sendRequest<T, R>(
		url: string,
		method: string,
		body: T | null = null
	): Observable<R> {
		return new Observable((subscriber) => {
			from(this.getOptions(body)).subscribe((options) => {
				this.http
					.request<R>(method, this.baseUrl + url, options)
					.pipe(catchError((err) => of(err.error)))
					.subscribe((result) => {
						subscriber.next(result);
						subscriber.complete();
					});
			});
		});
	}
}
