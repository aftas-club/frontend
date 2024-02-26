import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {API_URL} from "../../config/api";
import {Observable} from "rxjs";
import {Pagination} from "../model/pagination";
import {Competition} from "../model/competition";

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor(private http: HttpClient) {
  }

  private apiUrl: string = API_URL + 'competitions';

  getCompetitions(page: number, size: number): Observable<Pagination<Competition>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http
      .get<Pagination<Competition>>(this.apiUrl + "/paged", {params});
  }

  getCompetition(id: string): Observable<Competition> {
    return this.http.get<Competition>(this.apiUrl + '/' + id);
  }

  createCompetition(competition: Competition): Observable<Competition> {
    return this.http.post<Competition>(this.apiUrl, competition);
  }

}
