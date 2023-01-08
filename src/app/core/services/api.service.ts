import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV } from '@app/env';
import type { UserData } from '../interfaces/localStorage.d';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root',
})
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
    const headers = new HttpHeaders({
      Client: ENV.client,
    });
    const getToken =
      await this.localStorageService.getItemLocalStorage<UserData>('dataUser');

    if (getToken?.authToken) {
      headers.set('Authorization', `Bearer ${getToken?.authToken}`);
    }

    return headers;
  }

  public request<T, R>(url: string, method: string, body?: T): Promise<R> {
    return new Promise((resolve) => {
      this.getOptions(body).then((options) => {
        this.http
          .request<R>(method, ENV.baseUrl + url, options)
          .subscribe((result) => {
            resolve(result);
          });
      });
    });
  }
}
