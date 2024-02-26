import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorage} from "../services/token-storage.service";

@Injectable()
export class authInterceptorInterceptor implements HttpInterceptor {

  constructor(private tokenStorage: TokenStorage) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers: HttpHeaders = new HttpHeaders();
    const token: string | null = this.tokenStorage.getAccessToken();

    if (token != null && !request.url.includes("auth")) headers = new HttpHeaders()
      .append('Authorization', `Bearer ${token}`)

    const authReq: HttpRequest<any> = request.clone({
      headers: headers,
      withCredentials: true
    });

    return next.handle(authReq);
  }

}
