import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  type = ''

  constructor(
    private _router: Router,
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
  }

  setType(type) {
    this.type = type

    if (this.type !== 'Cart') {
        this._router.navigate(['/'], {
          queryParams: {
            type: this.type
          }
        })

        this._productService.setTipe(this.type)
    }
  }

}
