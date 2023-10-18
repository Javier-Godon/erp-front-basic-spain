import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

import { PersonPhoneNumber } from 'src/app/model/person/person-phone-number';

@Injectable({
  providedIn: 'root'
})
export class PhoneNumberService {

  constructor(private http: HttpClient) { }

  API_URL = "http://localhost:8090/person";
    
    //PhoneNumber
    
      newPhoneNumber(phoneNumber:PersonPhoneNumber): Observable<any> {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })     
        }
        return this.http.post(this.API_URL+"/phoneNumber", phoneNumber, {observe: 'response' ,responseType:'text'})    
         .pipe(
        //    catchError(this.handleError)
        );
    
      }
    
      deletePhoneNumber(phoneNumberId: String): Observable<any> {
        return this.http.delete(this.API_URL+"/phoneNumber/"+phoneNumberId, { observe: 'response' ,responseType:'text'})    
         .pipe(
          //  catchError(this.handleError('addHero', newPersonImageModel))
        );
    
      }
    
      updatePhoneNumber(phoneNumber:PersonPhoneNumber): Observable<any> {   
    
        return this.http.put(this.API_URL+"/phoneNumber/"+phoneNumber.phoneNumberId, phoneNumber, { observe: 'response' ,responseType:'text'})    
         .pipe(
          //  catchError(this.handleError('addHero', newPersonImageModel))
        );
    
      }
    
      getPhoneNumber(phoneNumberId: String): Observable<any> {    
    
        return this.http.get<PersonPhoneNumber>(this.API_URL+"/phoneNumber/"+phoneNumberId, { observe: 'response' ,responseType:'json'})    
         .pipe(
          //  catchError(this.handleError('addHero', newPersonImageModel))
        );
    
      }

      getPhoneNumberList(personId: String): Observable<any> {    
    
        return this.http.get<PersonPhoneNumber[]>(this.API_URL+"/phoneNumber/list/"+personId, { observe: 'response' ,responseType:'json'})    
         .pipe(
          //  catchError(this.handleError('addHero', newPersonImageModel))
        );
    
      }
  }
