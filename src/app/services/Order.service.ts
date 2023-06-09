import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import { CustomResponse } from '../interfaces/Custom-response';
import { Order } from '../interfaces/Order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService{

  private baseUrl = 'https://jabak-lah-app.herokuapp.com/api/orders';

  constructor(private httpClient : HttpClient) { }

  getOrders(){
    return this.httpClient.get(`${this.baseUrl}/allOrders`).pipe(
      tap(console.log)
    );
  }

  
  filterOrders$ = (item: string, response: CustomResponse) => <Observable<CustomResponse>>
  new Observable<CustomResponse>(
    subscriber => {
      console.log(response);
      const filteredOrders = (response.data.orders as Order[]).filter(order =>
        order?.status!.includes(item) ||
        order?.orderTrackingNumber!.includes(item)
      );
      const filteredResponse: CustomResponse = item === 'All'
        ? { ...response, message: `demandes filtered by ${item} type` }
        : {
          ...response,
          message: filteredOrders.length > 0
            ? `orders filtered by ${item} type`
            : `No orders of ${item} found`,
          data: { orders: filteredOrders },
        };

      subscriber.next(filteredResponse);
      subscriber.complete();
    }
  )

}
