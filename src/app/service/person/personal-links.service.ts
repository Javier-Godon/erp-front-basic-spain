import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

import { PersonPersonalLinks } from 'src/app/model/person/person-personal-links';
import { Person } from 'src/app/model/person/person';

@Injectable({
  providedIn: 'root'
})
export class PersonalLinksService {

  constructor(private http: HttpClient) { }

  API_URL = "http://localhost:8090/person";
    
    //PersonalLink
    
      newPersonalLink(personalLinks:PersonPersonalLinks): Observable<any> {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })     
        }
        console.log(personalLinks);
        return this.http.post(this.API_URL+"/personalLinks", personalLinks, {observe: 'response' ,responseType:'text'})    
         .pipe(
        //    catchError(this.handleError)
        );
    
      }
    
      deletePersonalLink(personalLinkId: String): Observable<any> {
        return this.http.delete(this.API_URL+"/personalLinks/"+personalLinkId, { observe: 'response' ,responseType:'text'})    
         .pipe(
          //  catchError(this.handleError('addHero', newPersonImageModel))
        );
    
      }

      deletePersonalLinkRelation(parentPersonId: String, childPersonId: String): Observable<any> {
        return this.http.delete(this.API_URL+"/personalLinks/"+parentPersonId+"/"+childPersonId, { observe: 'response' ,responseType:'text'})    
         .pipe(
          //  catchError(this.handleError('addHero', newPersonImageModel))
        );
    
      }
    
      updatePersonalLink(personalLinks:PersonPersonalLinks): Observable<any> {   
    
        return this.http.put(this.API_URL+"/personalLinks/"+personalLinks.personalLinkId, personalLinks, { observe: 'response' ,responseType:'text'})    
         .pipe(
          //  catchError(this.handleError('addHero', newPersonImageModel))
        );
    
      }
    
      getPersonalLink(personalLinkId: String): Observable<any> {    
    
        return this.http.get<PersonPersonalLinks>(this.API_URL+"/personalLinks/"+personalLinkId, { observe: 'response' ,responseType:'json'})    
         .pipe(
          //  catchError(this.handleError('addHero', newPersonImageModel))
        );
    
      }

      getParentPersonalLinkList(personId: String): Observable<any> {    
    
        return this.http.get<Person[]>(this.API_URL+"/personalLinks/parent/list/"+personId, { observe: 'response' ,responseType:'json'})    
         .pipe(
          //  catchError(this.handleError('addHero', newPersonImageModel))
        );
    
      }

      getChildPersonalLinkList(personId: String): Observable<any> {    
    
        return this.http.get<Person[]>(this.API_URL+"/personalLinks/child/list/"+personId, { observe: 'response' ,responseType:'json'})    
         .pipe(
          //  catchError(this.handleError('addHero', newPersonImageModel))
        );
    
      }
  }
