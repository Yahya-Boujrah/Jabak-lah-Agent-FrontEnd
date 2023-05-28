import { Injectable } from "@angular/core";
import{HttpClient, HttpHeaders} from "@angular/common/http"
import { BehaviorSubject, Observable, catchError, of, tap } from "rxjs";
import { CustomResponse } from "../interfaces/Custom-response";
import { Client } from "../interfaces/Client.interface";
import { Prospect } from "../interfaces/Prospect.interface";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
    providedIn: 'root'
  })
export class ProspectService {
    
  private readonly apiUrl = 'http://localhost:8080/api/agent';  

  private number$ = new BehaviorSubject<any>(null);
  currentNumber$ = this.number$.asObservable();

  constructor(private http: HttpClient) {}

  prospects$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/listProspect`)
    .pipe(
      tap(response => {
          console.log(response);
          this.number$.next(response.data.prospects!.length);
      })
    );

  convertProspect$ = (prospect :Prospect) => <Observable<CustomResponse>>
  this.http.post<CustomResponse>(`${this.apiUrl}/approve` ,prospect, httpOptions)
  .pipe(
    tap(console.log),
    catchError(() => {
      return of('error')
    })
  );

//   prospect$ =  (prospectId: number) => <Observable<CustomResponse>>
//   this.http.get<CustomResponse>(`${this.apiUrl}/get/${prospectId}`)
//   .pipe(
//     tap(console.log),
//     catchError(() => {
//       return of('error')
//     })
//   );

  deleteProspect$ = (prospectId: number) => <Observable<CustomResponse>>
  this.http.delete<CustomResponse>(`${this.apiUrl}/deleteProspect/${prospectId}`)
  .pipe(
    tap(console.log),
    catchError(() => {
      return of('error')
    })
  );
}
