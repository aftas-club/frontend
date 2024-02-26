import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = req.headers;
    const csrfToken = this.getToken();

    if (csrfToken) {
      headers = headers.set('X-XSRF-TOKEN', csrfToken);
    }

    const authReq = req.clone({headers});
    return next.handle(authReq);
  }

  private getToken(): string | null {
    return document.cookie.replace(/(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$|^.*$/, '$1');
  }
}
