import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {API_URL} from "../../config/api";
import {Observable} from "rxjs";
import {Pagination} from "../model/pagination";
import {User} from "../model/user";
import {ChangeRoleRequest} from "../model/change-role-request";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  private apiUrl: string = API_URL + 'users';

  getUsers(page: number, size: number): Observable<Pagination<User>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http
      .get<Pagination<User>>(this.apiUrl + "/paged", {params});
  }

  createUser(User: User) {
    return this.http.post<User>(this.apiUrl, User);
  }

  updateUser(User: User) {
    return this.http.put<User>(this.apiUrl, User);
  }

  changeRole(changeRoleRequest: ChangeRoleRequest) {
    return this.http.patch<User>(`${this.apiUrl}/change-role`, changeRoleRequest);
  }
}
