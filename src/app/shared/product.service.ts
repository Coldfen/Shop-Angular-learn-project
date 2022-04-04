import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FbResponce, Product } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  type: string = 'Phone'
  cartProducts: Product[] = []

  constructor(
    private _http: HttpClient
  ) { }

  create(product) {
      return this._http.post(`${environment.fbDBUrl}/products.json`, product)
      .pipe(map((responce: FbResponce) => {
       return{ 
         ...product,
         id: responce.name,
         date: new Date(product.date)
        }
      }))

    
  }
  
  getAll() {
    return this._http.get(`${environment.fbDBUrl}/products.json`)
    .pipe(map(res => {
      return Object.keys(res).map(key => ({
        ...res[key],
        id: key, 
        date: new Date(res[key].date)
      }))
    }))
  }

  getById(id) {
    return this._http.get(`${environment.fbDBUrl}/products/${id}.json`)
    .pipe(map((res: Product) => {
      return {
        ...res,
        id, 
        date: new Date(res.date)
     }})
    )
  }


  remove(id) {
    return this._http.delete(`${environment.fbDBUrl}/products/${id}.json`)
  }

  update(product: Product) {
    return this._http.patch(`${environment.fbDBUrl}/products/${product.id}.json`, product)
  }

  setTipe(type) {
    this.type = type
  }

  addProduct (product) {
    this.cartProducts.push(product)
  }
}
