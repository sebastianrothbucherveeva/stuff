import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // In a real situation, we would contact an authentication service to
    // retrieve user token and check if he has access to the resource, here we
    // simply provide an hardcoded JWT.
    const authToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.1OURXfxWcaT1DOs-abEis6N3RhQfIVWsUjv1VaUyev0';
    const authRequest = request.clone({
      setHeaders: { Authorization: `Bearer ${authToken}` },
    });

    return next.handle(authRequest);
  }
}
