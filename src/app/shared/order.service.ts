import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FbResponce } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private _http: HttpClient
  ) { }

  create(order) {
      return this._http.post(`${environment.fbDBUrl}/orders.json`, order)
      .pipe(map((responce: FbResponce) => {
       return{ 
         ...order,
         id: responce.name,
         date: new Date(order.date)
        }
      }))

    
  }
  
  getAll() {
    return this._http.get(`${environment.fbDBUrl}/orders.json`)
    .pipe(map(res => {
      return Object.keys(res).map(key => ({
        ...res[key],
        id: key, 
        date: new Date(res[key].date)
      }))
    }))
  }


  remove(id) {
    return this._http.delete(`${environment.fbDBUrl}/orders/${id}.json`)
  }


  
}
