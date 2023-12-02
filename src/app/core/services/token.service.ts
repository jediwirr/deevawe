import { map, Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Api } from './api.service';
import { LocalStorageService } from './localStorage.service';

@Injectable({
	providedIn: 'root'
})

export class TokenService extends Api {
	constructor(public httpClient: HttpClient) {
		super(httpClient, new LocalStorageService());
	}

	public receive(): Observable<string> {	
		// @ts-ignore
		return this.sendGetRequest('guest/token').pipe(map((token) => token.token ));
	}
}
