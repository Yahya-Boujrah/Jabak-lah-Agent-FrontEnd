import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import { CustomResponse } from '../interfaces/Custom-response';
import { Order } from '../interfaces/Order.interface';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService{

  private baseUrl = 'https://jabak-lah-app.herokuapp.com/api/delivery';

  constructor(private httpClient : HttpClient) { }

  getDeliveryMen(){
    return this.httpClient.get(`${this.baseUrl}/delivery`).pipe(
      tap(console.log)
    );
  }

  
  updateStatus(id : number , status: string){
    return this.httpClient.put(`${this.baseUrl}/update/${id}`, status).pipe(
      tap(console.log)
    );
  }
  
    
  updateOrder(orderId : number , dgId: number){
    return this.httpClient.put(`${this.baseUrl}/updateOrder/${orderId}`, dgId).pipe(
      tap(console.log)
    );
  }

}
