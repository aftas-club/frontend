import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorage} from "../services/token-storage.service";

@Injectable()
export class authInterceptorInterceptor implements HttpInterceptor {

  constructor(private tokenStorage: TokenStorage) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string | null = this.tokenStorage.getAccessToken()

    const authReq: HttpRequest<any> = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(authReq);
  }

}
