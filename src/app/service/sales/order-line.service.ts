import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { OrderLine } from 'src/app/model/sales/order-line';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderLineService {

  constructor(private http: HttpClient) { }

  API_URL = "http://localhost:8090/sales";

  //OrderLine

  newOrderLine(orderLine: OrderLine): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    console.log(orderLine);
    return this.http.post(this.API_URL + "/order/line", orderLine, { observe: 'response', responseType: 'text' })
      .pipe(
        //    catchError(this.handleError)
      );

  }

  deleteOrderLine(itemId: String): Observable<any> {
    return this.http.delete(this.API_URL + "/order/line/" + itemId, { observe: 'response', responseType: 'text' })
      .pipe(
        //  catchError(this.handleError('addHero', newOrderLineImageModel))
      );

  }

  updateOrderLine(orderLine: OrderLine): Observable<any> {

    console.log("updateOrderLine service --> OrderLine: " + orderLine);
    console.log("updateOrderLine service --> OrderLine.itemId: " + orderLine.orderLineId);

    return this.http.put(this.API_URL + "/order/line/" + orderLine.orderLineId, orderLine, { observe: 'response', responseType: 'text' })
      .pipe(
        //  catchError(this.handleError('addHero', newOrderLineImageModel))
      );

  }

  getOrderLine(itemId: String): Observable<any> {

    return this.http.get<OrderLine>(this.API_URL + "/order/line/" + itemId, { observe: 'response', responseType: 'json' })
      .pipe(
        catchError(error => {          
          if (error.status === 404) {
            console.log("orderLine not found por itemId: "+itemId);
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

