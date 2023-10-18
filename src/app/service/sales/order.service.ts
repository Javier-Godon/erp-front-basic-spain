import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/model/sales/order';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  API_URL = "http://localhost:8090/sales";

  //Order

  newOrder(order: Order): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    console.log(order);
    return this.http.post(this.API_URL + "/order", order, { observe: 'response', responseType: 'text' })
      .pipe(
        //    catchError(this.handleError)
      );

  }

  deleteOrder(itemId: String): Observable<any> {
    return this.http.delete(this.API_URL + "/order/" + itemId, { observe: 'response', responseType: 'text' })
      .pipe(
        //  catchError(this.handleError('addHero', newOrderImageModel))
      );

  }

  updateOrder(order: Order): Observable<any> {

    console.log("updateOrder service --> Order: " + order);
    console.log("updateOrder service --> Order.itemId: " + order.orderId);

    return this.http.put(this.API_URL + "/order/" + order.orderId, order, { observe: 'response', responseType: 'text' })
      .pipe(
        //  catchError(this.handleError('addHero', newOrderImageModel))
      );

  }

  getOrder(itemId: String): Observable<any> {

    return this.http.get<Order>(this.API_URL + "/order/" + itemId, { observe: 'response', responseType: 'json' })
      .pipe(
        catchError(error => {          
          if (error.status === 404) {
            console.log("order not found por itemId: "+itemId);
            return new Observable<any>(null);
          }
        })
      );

  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
