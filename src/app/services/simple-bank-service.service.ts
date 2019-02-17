import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders, HttpResponse, HttpEvent, HttpHeaderResponse, HttpResponseBase } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SimpleBankServiceService {
  private baseUrl = 'https://simplebanking.herokuapp.com';  // URL to web api
  
  constructor(private http: HttpClient) {
    //this.baseUrl = 'http://localhost:9000';
    
  }

  doLogin (username,password): Observable<any> {
    window['actualUsername'] = username;
    return this.post(this.baseUrl+'/login',{
        "username": username,
        "password": password
    });
  }

  getStatement(): Observable<any> {
      let username = window['actualUsername'];
      return this.get(this.baseUrl+'/statement',{
        "username": username
    });
  }

  doDeposit (ammount): Observable<any> {
    let username = window['actualUsername'];
    return this.post(this.baseUrl+'/deposit',{
        "username": username,
        "ammount": ammount
    });
  }
  doWithdraw (ammount): Observable<any> {
    let username = window['actualUsername'];
    return this.post(this.baseUrl+'/withdraw',{
        "username": username,
        "ammount": ammount
    });
  }

  get(
    endpoint: string,
    params?: any,
    headers?: any
  ) {
    let httpParams = new HttpParams();
    if (params) {
      for (const k in params) {
        if (params.hasOwnProperty(k)) {
          httpParams = httpParams.append(k, params[k]);
        }
      }
    }
    const options: any = {
      observe: 'response',
      headers: new HttpHeaders(headers),
      params: httpParams
    };
    return this.http.get<any>(endpoint, options).pipe(
      map((response:any) => {
        
        return this.transformResponse(response);
      })
    );
  }

  post(
    endpoint: string,
    body: any,
    headers?: any
  ) {
    const options: any = {
      observe: 'response',
      headers: new HttpHeaders(headers)
    };
    

    return this.http.post<any>(endpoint, body, options).pipe(
      map((response:any) => {
        console.log(response);
        return this.transformResponse(response);
      })
    );
  }
  transformResponse(response) {
    return response;
  }
    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
