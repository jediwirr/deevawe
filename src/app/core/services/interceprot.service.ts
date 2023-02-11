import { LocalStorageService } from './localStorage.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs'

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    constructor(private localStorageService: LocalStorageService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.localStorageService.token;
        let authReq = req;
        if (token) {
          authReq = req.clone({
                headers: req.headers.set('Authorization', token)
            })
        }
        return next.handle(authReq).pipe(
            tap(
                () => {},
                (error: any) => {
                    if (error instanceof HttpErrorResponse) {
                        if (!error.ok) {
                            console.log('Запрос не прошел');
                        }
                    }
                }
            )
        )
    }
}