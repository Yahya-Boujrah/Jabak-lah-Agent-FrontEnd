import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomResponse } from 'src/app/interfaces/Custom-response';
import { OrderService } from 'src/app/services/Order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public constructor(private orderService: OrderService){}
  orderResponse !:CustomResponse;

  public dataSubject = new BehaviorSubject<any>(null);


  doSearch(value: string) {
    console.log(`value=${value}`);
    this.orderService.filterOrders$(value, this.dataSubject.value).subscribe(response =>{
      this.orderResponse = response;
    })
  }

  ngOnInit(){
    this.orderService.getOrders().subscribe(response =>{
      this.dataSubject.next(response);

      this.orderResponse = response;
      this.orderResponse = { ...response, data: { orders: response.data.orders?.reverse() } };
    })
  }

}
