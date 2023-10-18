import { HttpClient, HttpErrorResponse,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CatalogItemImage } from '../model/catalog/catalog-item-image-model'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PhotoUploadService {

  constructor(private http: HttpClient) { }

  // const httpOptions;
  retrievedImage: any;
  imageName: any;
  base64Data: any;
  retrieveResonse: any;

  sendNewImage(imageUploadData: FormData): Observable<any> {

    // this.httpOptions= {
    //   observe:'response',
    //   responseType:'json'
    // }

    //this.httpOptions = {      
    //  headers: new HttpHeaders({
    //    'Content-Type':  'application/json',
    //    Authorization: 'my-auth-token'
    // })

    const API_URL = "http://localhost:8090/catalog/image";
    // const API_URL = "http://localhost:9014/catalog/image";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // return this.http.post(API_URL, imageUploadData,httpOptions) 
    return this.http.post(API_URL, imageUploadData, { observe: 'events' ,responseType:'text', reportProgress: true})    
     .pipe(
      //  catchError(this.handleError('addHero', newItemImageModel))
    );
  }

  onUploadFile() {

  }

   //Gets called when the user clicks on retieve image button to get the image from back end
   getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.http.get('http://localhost:8080/catalog/image' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}
