import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { CatalogItemRetailPrice } from 'src/app/model/catalog/catalog-item-retail-price-model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemRetailPriceService {

  constructor(private http: HttpClient) { }

  API_URL = "http://localhost:8090/catalog";

  //CatalogItemRetailPrice

  newPrice(price: CatalogItemRetailPrice): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    console.log(price);
    return this.http.post(this.API_URL + "/price", price, { observe: 'response', responseType: 'text' })
      .pipe(
        //    catchError(this.handleError)
      );

  }

  deletePrice(itemId: String): Observable<any> {
    return this.http.delete(this.API_URL + "/price/" + itemId, { observe: 'response', responseType: 'text' })
      .pipe(
        //  catchError(this.handleError('addHero', newCatalogItemRetailPriceImageModel))
      );

  }

  updatePrice(price: CatalogItemRetailPrice): Observable<any> {

    console.log("updatePrice service --> catalogItemRetailPrice: " + price);
    console.log("updatePrice service --> catalogItemRetailPrice.itemId: " + price.itemId);

    return this.http.put(this.API_URL + "/price/" + price.itemId, price, { observe: 'response', responseType: 'text' })
      .pipe(
        //  catchError(this.handleError('addHero', newCatalogItemRetailPriceImageModel))
      );

  }

  getPrice(itemId: String): Observable<any> {

    return this.http.get<CatalogItemRetailPrice>(this.API_URL + "/price/" + itemId, { observe: 'response', responseType: 'json' })
      .pipe(
        catchError(error => {          
          if (error.status === 404) {
            console.log("price not found por itemId: "+itemId);
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
