import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Person } from 'src/app/model/person/person';
import { SearchString } from 'src/app/model/person/search-string';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  API_URL = "http://localhost:8090/person";
  
  //Person
  
    newPerson(person:Person): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })     
      }
      console.log(person);
      return this.http.post(this.API_URL+"/person", person, {observe: 'response' ,responseType:'text'})    
       .pipe(
      //    catchError(this.handleError)
      );
  
    }
  
    deletePerson(personId: String): Observable<any> {
      return this.http.delete(this.API_URL+"/person/"+personId, { observe: 'response' ,responseType:'text'})    
       .pipe(
        //  catchError(this.handleError('addHero', newPersonImageModel))
      );
  
    }
  
    updatePerson(person:Person): Observable<any> {   
  
      return this.http.put(this.API_URL+"/person/"+person.personId, person, { observe: 'response' ,responseType:'text'})    
       .pipe(
        //  catchError(this.handleError('addHero', newPersonImageModel))
      );
  
    }
  
    getPerson(personId: String): Observable<any> {    
  
      return this.http.get<Person>(this.API_URL+"/person/"+personId, { observe: 'response' ,responseType:'json'})    
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

    getSomePersons(searchString:SearchString): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })     
      }
      console.log(searchString);
      return this.http.post<Person[]>(this.API_URL+"/person/search", searchString, {observe: 'response' ,responseType:'json'})    
       .pipe(
      //    catchError(this.handleError)
      );
  
    }
}
