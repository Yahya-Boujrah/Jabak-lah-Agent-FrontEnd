import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable, catchError, of, tap } from "rxjs";
import { CustomResponse } from "../interfaces/Custom-response";
import { Agent } from "../interfaces/Agent.interface";
import { ChangePassword } from "../interfaces/Change-password";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private readonly apiUrl = 'https://jabak-lah-app.herokuapp.com/api/agent';

  constructor(private http: HttpClient) { }

  agents$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/listAgent`)
      .pipe(
        tap(console.log),
        catchError(() => {
          return of('error')
        })
      );

  agent$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/infos`)
      .pipe(
        tap(console.log)
      )

  changePassword$ = (changePassword: ChangePassword) => <Observable<CustomResponse>>
    this.http.put<CustomResponse>(`${this.apiUrl}/changePassword`, changePassword, httpOptions)
      .pipe(
        tap(console.log)
      );
 
}
