import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogLink } from 'src/app/model/catalog/catalog-link-model';

@Injectable({
  providedIn: 'root'
})
export class CategoryLinkService {

  constructor(private http: HttpClient) { }

  API_URL = "http://localhost:8090/catalog/link";

  newCategoryLink(categoryLink:CatalogLink): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })     
    }
    console.log("from service newCategoryLink "+categoryLink);
    return this.http.post(this.API_URL, categoryLink, {observe: 'response' ,responseType:'text'})    
     .pipe(
    //    catchError(this.handleError)
    );

  }

  deleteCategoryLink(categoryLinkId: String): Observable<any> {
    return this.http.delete(this.API_URL+categoryLinkId, { observe: 'response' ,responseType:'text'})    
     .pipe(
      //  catchError(this.handleError('addHero', newCategoryImageModel))
    );

  }

  updateCategoryLink(categoryLink:CatalogLink): Observable<any> {   

    return this.http.put(this.API_URL+categoryLink.categoryLinkId, categoryLink, { observe: 'response' ,responseType:'text'})    
     .pipe(
      //  catchError(this.handleError('addHero', newCategoryImageModel))
    );

  }

  getCategoryLink(categoryId: String): Observable<any> {    

    return this.http.get<CatalogLink>(this.API_URL+categoryId, { observe: 'body' ,responseType:'json'})    
     .pipe(
      //  catchError(this.handleError('addHero', newCategoryImageModel))
    );

  }


}
