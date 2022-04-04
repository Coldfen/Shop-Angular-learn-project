import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  
  products = []
  pSub: Subscription
  rSub: Subscription
  productName

  constructor(
    private _productSrvice: ProductService
  ) { }

  ngOnInit(): void {
    this.pSub =  this._productSrvice.getAll().subscribe( products => {
      this.products = products
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
    this.rSub =  this._productSrvice.remove(id).subscribe( () => {
      this.products = this.products.filter( products => products.id !== id )
    })
  }
}
