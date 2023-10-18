import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogItemCategorized } from 'src/app/model/catalog/catalog-item-categorized-model';

@Injectable({
  providedIn: 'root'
})
export class ItemCategorizedService {

  constructor(private http: HttpClient) { }

  API_URL = "http://localhost:8090/catalog/categorized";

  newItemCategorized(itemCategorized:CatalogItemCategorized): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })     
    }
    console.log(itemCategorized);
    return this.http.post<CatalogItemCategorized>(this.API_URL, itemCategorized, {observe: 'response' ,responseType:'json'})    
     .pipe(
    //    catchError(this.handleError)
    );

  }

  deleteItemCategorized(itemCategorizedId: String): Observable<any> {
    return this.http.delete(this.API_URL+itemCategorizedId, { observe: 'response' ,responseType:'text'})    
     .pipe(
      //  catchError(this.handleError('addHero', newItemCategorizedImageModel))
    );

  }

  updateItemCategorized(itemCategorized:CatalogItemCategorized): Observable<any> {   

    return this.http.put(this.API_URL+itemCategorized.itemCategorizedId, itemCategorized, { observe: 'response' ,responseType:'text'})    
     .pipe(
      //  catchError(this.handleError('addHero', newItemCategorizedImageModel))
    );

  }

  getItemCategorized(itemCategorizedId: String): Observable<any> {    

    return this.http.get<CatalogItemCategorized>(this.API_URL+itemCategorizedId, { observe: 'body' ,responseType:'json'})    
     .pipe(
      //  catchError(this.handleError('addHero', newItemCategorizedImageModel))
    );

  }

}
