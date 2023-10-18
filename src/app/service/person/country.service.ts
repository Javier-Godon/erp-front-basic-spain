import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Country } from 'src/app/model/person/person-country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  API_URL = "http://localhost:8090/person";
  
  //Country
  
    newCountry(country: Country): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })     
      }
      console.log(country);
      return this.http.post(this.API_URL+"/country", country, {observe: 'response' ,responseType:'text'})    
       .pipe(
      //    catchError(this.handleError)
      );
  
    }
  
    deleteCountry(countryId: String): Observable<any> {
      return this.http.delete(this.API_URL+"/country/"+countryId, { observe: 'response' ,responseType:'text'})    
       .pipe(
        //  catchError(this.handleError('addHero', newPersonImageModel))
      );
  
    }
  
    updateCountry(country: Country): Observable<any> {   
  
      return this.http.put(this.API_URL+"/country/"+country.countryId, country, { observe: 'response' ,responseType:'text'})    
       .pipe(
        //  catchError(this.handleError('addHero', newPersonImageModel))
      );
  
    }
  
    getCountry(countryId: String): Observable<any> {    
  
      return this.http.get<Country>(this.API_URL+"/country/"+countryId, { observe: 'response' ,responseType:'json'})    
       .pipe(
        //  catchError(this.handleError('addHero', newPersonImageModel))
      );
  
    }

    // getSomePersons(searchString: String): Observable<any> {

    //   return this.http.get<Person[]>(this.API_URL+"/person/list/"+searchString, { observe: 'response' ,responseType:'json'})    
    //    .pipe(
    //     //  catchError(this.handleError('addHero', newItemImageModel))
    //   );
  
    // }   

    getCountriesList(): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })     
      }
      return this.http.post<Country[]>(this.API_URL+"/country/all", {observe: 'response' ,responseType:'json'})    
       .pipe(
      //    catchError(this.handleError)
      );
  
    }
}
