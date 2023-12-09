import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AttachTokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Get the auth token from the service.
    const authToken = this.auth.getAuthorizationToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    if (authToken) {
      const authTokenWithBearer = `Bearer ${authToken}`;
      const authReq = request.clone({
        headers: request.headers.set('Authorization', authTokenWithBearer),
      });
      return next.handle(authReq);
    }

    return next.handle(request);
  }
}
