import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Currency } from 'src/app/model/currency/currency-model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  API_URL = "http://localhost:8090/catalog";
  
  
  //Currency
  
    newCurrency(currency:Currency): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })     
      }
      console.log(currency);
      return this.http.post(this.API_URL+"/currency", currency, {observe: 'response' ,responseType:'text'})    
       .pipe(
      //    catchError(this.handleError)
      );
  
    }
  
    deleteCurrency(currencyId: String): Observable<any> {
      return this.http.delete(this.API_URL+"/currency/"+currencyId, { observe: 'response' ,responseType:'text'})    
       .pipe(
        //  catchError(this.handleError('addHero', newCurrencyImageModel))
      );
  
    }
  
    updateCurrency(currency:Currency): Observable<any> {   
  
      return this.http.put(this.API_URL+"/currency/"+currency.currencyId, currency, { observe: 'response' ,responseType:'text'})    
       .pipe(
        //  catchError(this.handleError('addHero', newCurrencyImageModel))
      );
  
    }
  
    getCurrency(currencyId: String): Observable<any> {    
  
      return this.http.get<Currency>(this.API_URL+"/currency/"+currencyId, { observe: 'response' ,responseType:'json'})    
       .pipe(
        //  catchError(this.handleError('addHero', newCurrencyImageModel))
      );
  
    }


    getCurrencies(): Observable<any> {    
  
      return this.http.get<Currency[]>(this.API_URL+"/currency/", { observe: 'response' ,responseType:'json'})    
       .pipe(
        //  catchError(this.handleError('addHero', newCurrencyImageModel))
      );
  
    }
    

    getCurrencyFromIso(currencyIso3: String): Observable<any> {    
  
      return this.http.get<Currency>(this.API_URL+"/currency/from-iso/"+currencyIso3, { observe: 'response' ,responseType:'json'})    
       .pipe(
        //  catchError(this.handleError('addHero', newCurrencyImageModel))
      );
  
    }
    
}
