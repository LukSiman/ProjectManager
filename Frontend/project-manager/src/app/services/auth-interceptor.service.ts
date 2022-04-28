import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
      request = request.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('token')!
        }
      })
    };
    return next.handle(request);
  }
}
