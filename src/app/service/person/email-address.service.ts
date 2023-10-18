import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

import { PersonEmailAddress } from 'src/app/model/person/person-emai-address';

@Injectable({
  providedIn: 'root'
})
export class EmailAddressService {

  constructor(private http: HttpClient) { }

  API_URL = "http://localhost:8090/person";
    
    //Email
    
      newEmail(emailAddress:PersonEmailAddress): Observable<any> {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })     
        }
        console.log(emailAddress);
        return this.http.post(this.API_URL+"/emailAddress", emailAddress, {observe: 'response' ,responseType:'text'})    
         .pipe(
        //    catchError(this.handleError)
        );
    
      }
    
      deleteEmail(emailAddressId: String): Observable<any> {
        return this.http.delete(this.API_URL+"/emailAddress/"+emailAddressId, { observe: 'response' ,responseType:'text'})    
         .pipe(
          //  catchError(this.handleError('addHero', newPersonImageModel))
        );
    
      }
    
      updateEmail(emailAddress:PersonEmailAddress): Observable<any> {   
    
        return this.http.put(this.API_URL+"/emailAddress/"+emailAddress.emailAddressId, emailAddress, { observe: 'response' ,responseType:'text'})    
         .pipe(
          //  catchError(this.handleError('addHero', newPersonImageModel))
        );
    
      }
    
      getEmail(emailAddressId: String): Observable<any> {    
    
        return this.http.get<PersonEmailAddress>(this.API_URL+"/emailAddress/"+emailAddressId, { observe: 'response' ,responseType:'json'})    
         .pipe(
          //  catchError(this.handleError('addHero', newPersonImageModel))
        );
    
      }

      getEmailList(personId: String): Observable<any> {    
    
        return this.http.get<PersonEmailAddress[]>(this.API_URL+"/emailAddress/list/"+personId, { observe: 'response' ,responseType:'json'})    
         .pipe(
          //  catchError(this.handleError('addHero', newPersonImageModel))
        );
    
      }
  }
