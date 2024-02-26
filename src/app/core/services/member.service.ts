import {Injectable} from '@angular/core';
import {API_URL} from "../../config/api";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Member} from "../model/member";
import {Observable} from "rxjs";
import {Pagination} from "../model/pagination";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) {
  }

  private apiUrl: string = API_URL + 'members';

  getMembers(page: number, size: number): Observable<Pagination<Member>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http
      .get<Pagination<Member>>(this.apiUrl + "/paged", {params});
  }

  createMember(member: Member) {
    return this.http.post<Member>(this.apiUrl, member);
  }
}
