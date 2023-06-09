import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomResponse } from 'src/app/interfaces/Custom-response';
import { DG } from 'src/app/interfaces/Delivery-guy.interface';
import { DeliveryService } from 'src/app/services/Delevery-guy.service';
import { OrderService } from 'src/app/services/Order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public constructor(private orderService: OrderService, private dgService: DeliveryService) { }
  orderResponse !: CustomResponse;
  dgResponse!: CustomResponse;
  deliveryGuy !: DG;


  public dataSubject = new BehaviorSubject<any>(null);


  doSearch(value: string) {
    console.log(`value=${value}`);
    this.orderService.filterOrders$(value, this.dataSubject.value).subscribe(response => {
      this.orderResponse = response;
    })
  }

  ngOnInit() {
    this.orderService.getOrders().subscribe(response => {
      this.dataSubject.next(response);

      this.orderResponse = response;
      this.orderResponse = { ...response, data: { orders: response.data.orders?.reverse() } };
    })

    this.dgService.getDeliveryMen().subscribe(response => {
      this.dgResponse = response;
    });
  }

  changeStatus(orderId : any, status : string){
    this.dgService.updateStatus(orderId , status).subscribe();
  }

  affectDg(orderId: any){
    console.log(' dg id ' + this.deliveryGuy);
    console.log('oerder id '+ orderId );
    const ids : number[] = [this.deliveryGuy, orderId];
    this.dgService.updateOrder(ids).subscribe();
  }

}
