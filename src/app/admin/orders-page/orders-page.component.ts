import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {

  orders = []
  pSub: Subscription
  rSub: Subscription

  constructor(
    private _ordersService: OrderService
  ) { }


  ngOnInit(): void {
    this.pSub =  this._ordersService.getAll().subscribe( orders => {
      this.orders = orders
    })
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
    if (this.rSub) {
      this.rSub.unsubscribe()
    }
    
  }

  remove(id) {
    this.rSub =  this._ordersService.remove(id).subscribe( () => {
      this.orders = this.orders.filter( order => order.id !== id )
    })
  }

}
