import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

import { PersonAddress } from 'src/app/model/person/person-address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

API_URL = "http://localhost:8090/person";
  
  //Person
  
    newAddress(address:PersonAddress): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })     
      }
      console.log(address);
      return this.http.post(this.API_URL+"/address", address, {observe: 'response' ,responseType:'text'})    
       .pipe(
      //    catchError(this.handleError)
      );
  
    }
  
    deleteAddress(addressId: String): Observable<any> {
      return this.http.delete(this.API_URL+"/address/"+addressId, { observe: 'response' ,responseType:'text'})    
       .pipe(
        //  catchError(this.handleError('addHero', newPersonImageModel))
      );
  
    }
  
    updateAddress(address:PersonAddress): Observable<any> {   
  
      return this.http.put(this.API_URL+"/address/"+address.addressId, address, { observe: 'response' ,responseType:'text'})    
       .pipe(
        //  catchError(this.handleError('addHero', newPersonImageModel))
      );
  
    }
  
    getAddress(addressId: String): Observable<any> {    
  
      return this.http.get<PersonAddress>(this.API_URL+"/address/"+addressId, { observe: 'response' ,responseType:'json'})    
       .pipe(
        //  catchError(this.handleError('addHero', newPersonImageModel))
      );
  
    }
}
