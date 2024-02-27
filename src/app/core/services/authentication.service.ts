import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {TokenStorage} from './token-storage.service';
import {RegisterRequest} from '../model/register-request';
import {AuthenticationResponse} from '../model/authentication-response';
import {LoginRequest} from "../model/login-request";
import {catchError, map, switchMap} from 'rxjs/operators';
import {RoutingService} from "./routing.service";
import {API_URL} from '../../config/api';
import {User} from '../model/user';
import {GoogleOauthUrl} from "../model/google-oauth-url";

/**
 * Service for handles user authentication processes including registration,
 * login, token management, and user session maintenance.
 * It also supports integration with Google OAuth for authentication and provides methods to check user roles,
 * permissions, and logout functionalities.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorage, private router: RoutingService) {
  }

  /**
   * Registers a new user.
   * @param request The registration request payload.
   * @returns An Observable of the authentication response.
   */
  register(request: RegisterRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(
      `${API_URL}register`,
      request
    );
  }

  /**
   * Authenticates a user.
   * @param request The login request payload.
   * @returns An Observable of the authentication status.
   */
  authenticate(request: LoginRequest): Observable<boolean> {
    return this.http
      .post<AuthenticationResponse>(`${API_URL}auth/authenticate`, request)
      .pipe(
        catchError(this.handleError),
        map(token => {
          this.tokenStorage.setToken(token);
          return true;
        })
      );
  }

  /**
   * Retrieves the roles of the current authenticated user.
   * @returns An array of role strings.
   */
  getRoles(): string[] {
    return this.tokenStorage.getRoles();
  }

  /**
   * Retrieves the permissions of the current authenticated user.
   * @returns An array of permission strings.
   */
  getPermissions(): string[] {
    return this.tokenStorage.getPermissions();
  }

  /**
   * Refreshes the authentication token.
   * @returns An Observable that emits once the token is refreshed.
   */
  refreshToken(): Observable<void> {
    return this.http
      .post<AuthenticationResponse>(`${API_URL}auth/refresh-token`, {}, {
        headers: {Authorization: `Bearer ${this.tokenStorage.getRefreshToken()}`}
      })
      .pipe(
        catchError(this.handleError),
        map(response => {
          this.tokenStorage.setToken(response);
        })
      );
  }

  /**
   * Checks if the current user is authenticated.
   * @returns An Observable that emits true if the user is authenticated, otherwise throws an error.
   */
  isAuthenticated(): Observable<boolean> {
    const token = this.tokenStorage.getAccessToken();
    if (!token) {
      return throwError(() => new Error('No token found'));
    }
    return this.http.post<void>(`${API_URL}auth/check-token`, null, {
      headers: {Authorization: `Bearer ${token}`}
    })
      .pipe(
        catchError(this.handleError),
        map(() => true)
      );
  }


  /**
   * Gets the URL for Google OAuth authentication.
   * @returns An Observable containing the Google OAuth URL.
   */
  getOauthGoogleUrl(): Observable<string> {
    return this.http.get<GoogleOauthUrl>(`${API_URL}Oauth/google/url`)
      .pipe(
        map((data: any) => data.authURL)
      );
  }

  /**
   * Authenticates a user via Google OAuth.
   * @param code The authorization code from Google.
   * @returns An Observable indicating the authentication status.
   */
  OauthGoogleAuthenticate(code: string): Observable<boolean> {
    return this.http
      .get<AuthenticationResponse>(`${API_URL}Oauth/google/callback?code=${code}`)
      .pipe(
        catchError(this.handleError),
        switchMap((token: AuthenticationResponse) => {
          this.tokenStorage.setToken(token);
          this.redirectToSpecificPage().then();
          return of(true);
        })
      )
  }

  /**
   * Retrieves the current authenticated user.
   * @returns An Observable containing the current user.
   */
  getCurrentAuthenticatedUser(): Observable<User> {
    return this.http
      .get<User>(`${API_URL}users/current`);
  }

  /**
   * Logs out the current user.
   */
  logout(): void {
    this.http
      .get<void>(`${API_URL}auth/logout`)
      .pipe(
        catchError(this.handleError),
        map(async () => {
            this.tokenStorage.clear();
            await this.router.navigateTo('/auth/login');
          }
        )
      );
  }

  public async redirectToSpecificPage() {
    if (this.getRoles()?.includes('ROLE_USER'))
      await this.router.goToUser();
    else if (this.getRoles()?.includes('ROLE_MANAGER'))
      await this.router.goToManager();
    else if (this.getRoles()?.includes('ROLE_MEMBER'))
      await this.router.goToMember();
    else if (this.getRoles()?.includes('ROLE_JURY'))
      await this.router.goToJury();
  }

  /**
   * Handles HTTP errors.
   * @param error The HTTP error response.
   * @returns An Observable throwing an error.
   */
  private handleError(error: HttpErrorResponse) {
    console.error('Error occurred: ', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}
