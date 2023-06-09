import { Injectable } from "@angular/core";
import{HttpClient, HttpHeaders} from "@angular/common/http"
import { Observable, catchError, of, tap, throwError } from "rxjs";
import { CustomResponse } from "../interfaces/Custom-response";
import { Client } from "../interfaces/Client.interface";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
    providedIn: 'root'
  })
export class ClientService {
  private readonly apiUrl = 'https://jabak-lah-app.herokuapp.com';  

  constructor(private http: HttpClient) {}

  clients$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/api/agent/listClient`)
    .pipe(
      tap(console.log),
      catchError(() => {
        return of('error')
      })
    );

  saveClient$ = (client:Client) => <Observable<CustomResponse>>
  this.http.post<CustomResponse>(`${this.apiUrl}/api/agent/addClient` ,client, httpOptions)
  .pipe(
    tap(console.log),
    catchError(() => {
      return of('error')
    })
  );

  updateClient$ = (clientId: number,client:Client) => <Observable<CustomResponse>>
  this.http.put<CustomResponse>(`${this.apiUrl}/api/agent/update/${clientId}`, client, httpOptions)
  .pipe(
    tap(console.log),
    catchError(() => {
      return of('error')
    })
  );

  resetPassword$ = (clientId: number) => <Observable<CustomResponse>>
  this.http.put<CustomResponse>(`${this.apiUrl}/api/agent/resetPasswordClient/${clientId}`, null)
  .pipe(
    tap(console.log)
  );

  filterClients$ = (name: string, response: CustomResponse): Observable<CustomResponse> =>
  new Observable<CustomResponse>(subscriber => {
    console.log(response);

    if (!response || !response.data || !response.data.clients) {
      const errorMessage = 'Invalid response format';
      subscriber.error(errorMessage);
      return;
    }

    const filteredClients = (response.data.clients as Client[]).filter(client => {
      const lowerCaseName = name.toLowerCase();
      const lowerCaseLastName = client?.lastName?.toLowerCase() || '';
      const lowerCaseFirstName = client?.firstName?.toLowerCase() || '';

      return (
        lowerCaseLastName.includes(lowerCaseName) ||
        lowerCaseFirstName.includes(lowerCaseName) ||
        client?.phone?.includes(name)
      );
    });

    const filteredResponse: CustomResponse = {
      ...response,
      message:
        filteredClients.length > 0
          ? `Clients filtered by name "${name}"`
          : `No clients found with name "${name}"`,
      data: { clients: filteredClients },
    };

    subscriber.next(filteredResponse);
    subscriber.complete();
  }).pipe(
    tap(console.log),
    catchError(error => {
      console.error(error);
      return throwError('An error occurred during client filtering');
    })
  );

  client$ =  (clientId: number) => <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/api/agent/get/${clientId}`)
  .pipe(
    tap(console.log),
    catchError(() => {
      return of('error')
    })
  );

  deleteClient$ = (clientId: number) => <Observable<CustomResponse>>
  this.http.delete<CustomResponse>(`${this.apiUrl}/api/agent/delete/${clientId}`)
  .pipe(
    tap(console.log)
  );

  chargeSolde$ = (clientId:number ,amount: number) => <Observable<CustomResponse>>
  this.http.post<CustomResponse>(`${this.apiUrl}/api/cmi/charger/${clientId}`, amount, httpOptions)
  .pipe(
    tap(console.log)
  );
}
