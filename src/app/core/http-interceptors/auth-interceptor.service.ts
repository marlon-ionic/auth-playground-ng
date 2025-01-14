import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AuthenticationExpeditorService } from '../authentication/authentication-expeditor/authentication-expeditor.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthenticationExpeditorService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(
      this.requestRequiresToken(req)
        ? this.auth.getAccessToken().then((token) => {
            if (token) {
              req = req.clone({
                setHeaders: {
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                  Authorization: 'Bearer ' + token,
                },
              });
            }
          })
        : Promise.resolve()
    ).pipe(mergeMap(() => next.handle(req)));
  }

  private requestRequiresToken(req: HttpRequest<any>): boolean {
    return !/\/login$/.test(req.url);
  }
}
