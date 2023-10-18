import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CatalogItem } from 'src/app/model/catalog/catalog-item-model';
import { HttpHeaders } from '@angular/common/http';
import { CatalogItemRetailPrice } from 'src/app/model/catalog/catalog-item-retail-price-model';
import { CatalogItemDescription } from 'src/app/model/catalog/catalog-item-description-model';
import { CatalogItemImage } from 'src/app/model/catalog/catalog-item-image-model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  API_URL = "http://localhost:8090/catalog";
  
//Item

  newItem(item:CatalogItem): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })     
    }
    console.log(item);
    return this.http.post(this.API_URL+"/item", item, {observe: 'response' ,responseType:'text'})    
     .pipe(
    //    catchError(this.handleError)
    );

  }

  deleteItem(itemId: String): Observable<any> {
    return this.http.delete(this.API_URL+"/item/"+itemId, { observe: 'response' ,responseType:'text'})    
     .pipe(
      //  catchError(this.handleError('addHero', newItemImageModel))
    );

  }

  updateItem(item:CatalogItem): Observable<any> {   

    return this.http.put(this.API_URL+"/item/"+item.itemId, item, { observe: 'response' ,responseType:'text'})    
     .pipe(
      //  catchError(this.handleError('addHero', newItemImageModel))
    );

  }

  getItem(itemId: String): Observable<any> {    

    return this.http.get<CatalogItem>(this.API_URL+"/item/"+itemId, { observe: 'body' ,responseType:'json'})    
     .pipe(
      //  catchError(this.handleError('addHero', newItemImageModel))
    );

  }
 

  getAllItemsByCategory(categoryId: String): Observable<any> {

    return this.http.get<CatalogItem[]>(this.API_URL+"/item/category/"+categoryId, { observe: 'response' ,responseType:'json'})    
     .pipe(
      //  catchError(this.handleError('addHero', newItemImageModel))
    );

  }

  getItemCategories(itemId: String): Observable<any> {

    return this.http.get(this.API_URL+"item/categories", { observe: 'response' ,responseType:'arraybuffer'})    
     .pipe(
      //  catchError(this.handleError('addHero', newItemImageModel))
    );

  }

  //Item Price  

  newItemPrice(item:CatalogItemRetailPrice): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })     
    }
    console.log(item);
    return this.http.post(this.API_URL+"/price", item, {observe: 'response' ,responseType:'text'})    
     .pipe(
    //    catchError(this.handleError)
    );

  }

  deleteItemPrice(itemId: String): Observable<any> {
    return this.http.delete(this.API_URL+"/price/"+itemId, { observe: 'response' ,responseType:'text'})    
     .pipe(
      //  catchError(this.handleError('addHero', newItemImageModel))
    );

  }

  updateItemPrice(item:CatalogItemRetailPrice): Observable<any> {   

    return this.http.put(this.API_URL+"/price/"+item.itemId, item, { observe: 'response' ,responseType:'text'})    
     .pipe(
      //  catchError(this.handleError('addHero', newItemImageModel))
    );

  }

  getItemPrice(itemId: String): Observable<any> {

    return this.http.get<CatalogItemRetailPrice>(this.API_URL+"/price/"+itemId, { observe: 'response' ,responseType:'json'}) 
    .pipe(
      //  catchError(this.handleError('addHero', newItemImageModel))
    );
  }

  //Item Description
  newItemDescription(item:CatalogItemDescription): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })     
    }
    console.log(item);
    return this.http.post(this.API_URL+"/description", item, {observe: 'response' ,responseType:'text'})    
     .pipe(
    //    catchError(this.handleError)
    );

  }

  deleteItemDescription(itemId: String): Observable<any> {
    return this.http.delete(this.API_URL+"/description/"+itemId, { observe: 'response' ,responseType:'text'})    
     .pipe(
      //  catchError(this.handleError('addHero', newItemImageModel))
    );

  }

  updateItemDescription(item:CatalogItemDescription): Observable<any> {   

    return this.http.put(this.API_URL+"/description/"+item.itemId, item, { observe: 'response' ,responseType:'text'})    
     .pipe(
      //  catchError(this.handleError('addHero', newItemImageModel))
    );

  }

  getItemDescription(itemId: String): Observable<any> {

    return this.http.get<CatalogItemDescription>(this.API_URL+"/description/"+itemId, { observe: 'response' ,responseType:'json'}) 
    .pipe(
      //  catchError(this.handleError('addHero', newItemImageModel))
    );
  }

  //Item Image

  getAllItemImages(itemId: String): Observable<any> {

    return this.http.get<CatalogItemImage[]>(this.API_URL+"/image/all/"+itemId, { observe: 'response' ,responseType:'json'}) 
    .pipe(
      //  catchError(this.handleError('addHero', newItemImageModel))
    );
  }

  deleteImage(imageId: String): Observable<any> {
    return this.http.delete(this.API_URL+"/image/"+imageId, { observe: 'response' ,responseType:'text'})    
     .pipe(
      //  catchError(this.handleError('addHero', newItemImageModel))
    );

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
