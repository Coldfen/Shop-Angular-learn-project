import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  products$ 

  constructor(
    private _productService: ProductService
  ) { }

    get productService() {
      return this._productService
    }

  ngOnInit(): void {
    this.products$ = this._productService.getAll()
  }

}
