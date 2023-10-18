import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogCategory } from 'src/app/model/catalog/catalog-category-model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  API_URL = "http://localhost:8090/catalog/category";

  //Category

  newCategory(category:CatalogCategory): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })     
    }
    console.log(category);
    return this.http.post<CatalogCategory>(this.API_URL, category, {observe: 'response' ,responseType:'json'})    
     .pipe(
    //    catchError(this.handleError)
    );

  }

  deleteCategory(categoryId: String): Observable<any> {
    return this.http.delete(this.API_URL+categoryId, { observe: 'response' ,responseType:'text'})    
     .pipe(
      //  catchError(this.handleError('addHero', newCategoryImageModel))
    );

  }

  updateCategory(category:CatalogCategory): Observable<any> {   

    return this.http.put(this.API_URL+category.categoryId, category, { observe: 'response' ,responseType:'text'})    
     .pipe(
      //  catchError(this.handleError('addHero', newCategoryImageModel))
    );

  }

  getCategory(categoryId: String): Observable<any> {    

    return this.http.get<CatalogCategory>(this.API_URL+categoryId, { observe: 'body' ,responseType:'json'})    
     .pipe(
      //  catchError(this.handleError('addHero', newCategoryImageModel))
    );

  }

  getCategoryParent(categoryId: String): Observable<any> {

    return this.http.get(this.API_URL+"/parent/"+categoryId, { observe: 'response' ,responseType:'arraybuffer'})    
     .pipe(
      //  catchError(this.handleError('addHero', newCategoryImageModel))
    );

  }

  getAllMainCategories(): Observable<any> {

    return this.http.get<CatalogCategory[]>(this.API_URL+"/all/main", { observe: 'response' ,responseType:'json'})    
     .pipe(
      //  catchError(this.handleError('addHero', newItemImageModel))
    );

  }

  getAllChildrenForACategory(categoryId: String): Observable<any> {

    return this.http.get<CatalogCategory[]>(this.API_URL+"/all/children/"+categoryId, { observe: 'response' ,responseType:'json'})    
     .pipe(
      //  catchError(this.handleError('addHero', newItemImageModel))
    );

  }


  getAllParentsForACategory(categoryId: String): Observable<any> {

    return this.http.get<CatalogCategory[]>(this.API_URL+"/all/parents/"+categoryId, { observe: 'response' ,responseType:'json'})    
     .pipe(
      //  catchError(this.handleError('addHero', newItemImageModel))
    );

  }

}
